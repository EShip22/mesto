import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupDelCard} from '../components/PopupDelCard.js';
import {UserInfo} from '../components/UserInfo.js';
import {api} from '../components/Api.js';
import * as constants from '../utils/constants.js';
import '../pages/index.css';

const settings = constants.settings;
const tmpltSelector = '.element-template';
const avatar = document.querySelector('.profile__avatar');
let userId;

const setSaveBtnValue = (btnSelector, value) => {
	document.querySelector(btnSelector).value = value;
}

api.getUserInfo()
	.then((res) => {
		userInfo.setUserInfo(res.name, res.about);
		avatar.src = res.avatar;
		avatar.alt = res.name;
		userId = res._id;
	});

api.getInitialCards()
	.then((res) => {
		const section = new Section({
			items: res, 
			renderer: (data) => {
				const newCard = createCard({
						name: data.name,
						link: data.link,
						likes: data.likes,
						id: data._id,
						userId: userId,
						ownerId: data.owner._id
					},
					tmpltSelector,
					handleCardClick,
					openDelCardPopup,
					setLike,
					addLike,
					delLike
				);
				section.addItem(newCard);
			}}, '.elements');
		section.renderAll();
	})
	.catch((err) => console.log(err));

const setLike = (cardId) => {
	return api.setLike(cardId);
}

const addLike = (cardId) => {
	return api.addLike(cardId);
}

const delLike = (cardId) => {
	return api.delLike(cardId);
}

const submitAddCardForm = (formValues) => {
	setSaveBtnValue('.popup__save-add-card','Сохранение...');
	api.addCard(formValues.fieldCaption, formValues.fieldLink)
		.then((res) => {
			const card = createCard({
					name: formValues.fieldCaption,
					link: formValues.fieldLink,
					likes: null,
					id: res._id,
					userId: userId,
					ownerId: userId
				},
				tmpltSelector,
				handleCardClick,
				openDelCardPopup,
				addLike,
				delLike
			);

			const section = new Section({
				items: null, 
				renderer: (card) => {
					const newCard = createCard({
						name: card.name,
						link: card.link,
						likes: card.likes,
						id: card._id,
						userId: userId,
						ownerId: userId
					});
					section.addItem(newCard);
				}}, '.elements'
			);

			section.addItem(card, true);
		})
		.catch((err) => console.log(err))
		.finally((res) => {
			setSaveBtnValue('.popup__save-add-card','Создать');
		});
}

const submitEditProfileForm = (formValues) => {
	setSaveBtnValue('.popup__save-edit-profile','Сохранение...');
	api.setUserInfo(formValues)
		.then((res) => {
			userInfo.setUserInfo(formValues.name, formValues.description);
		})

		.finally((res) => {
			setSaveBtnValue('.popup__save-edit-profile','Сохранить');
		});
}

const submitEditAvatarForm = (formValues) => {
	setSaveBtnValue('.popup__save-edit-avatar','Сохранение...');
	api.setUserAvatar(formValues.avatarLink)
		.then((res) => {
				avatar.src = res.avatar;
		})
		.catch((err) => console.log(err))
		.finally((res) => {
			setSaveBtnValue('.popup__save-edit-avatar', 'Сохранить');
		});
}

const popupWithImage = new PopupWithImage('.popup_show-image');
popupWithImage.setEventListeners();

const handleCardClick = (name, link) => {
	popupWithImage.open(link, name);
}

const openDelCardPopup = (cardElem, id) => {
	popupDelCard.open(cardElem, id);
}

const createCard = (props) => {
	const newCard = 
	 new Card({
			name: props.name ?? '',
			link: props.link,
			likes: props.likes,
			id: props.id,
			userId: props.userId,
			ownerId: props.ownerId
		},
		tmpltSelector,
		handleCardClick,
		openDelCardPopup,
		addLike,
		delLike).generateCard();
		return newCard;
}

const userInfo = new UserInfo({
	userNameSelector: '.profile-info__header',
	userActivitySelector: '.profile-info__description',
	userAvatarSelector: '.profile__avatar'
});

//
//	формы, попапы с формой, валидация форм
//
const popupAddCard = new PopupWithForm('.popup_add-card', submitAddCardForm, settings, true);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_edit-profile', submitEditProfileForm, settings);
popupEditProfile.setEventListeners();

const popupDelCard = new PopupDelCard(
	'.popup_del-card',
	api.delCard
);
popupDelCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', submitEditAvatarForm, settings, true);
popupEditAvatar.setEventListeners();

const formAddCard = document.querySelector('.popup__form_type_add');
const formAddValidator = new FormValidator(settings, formAddCard);
formAddValidator.enableValidation();

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formEditProfileValidator = new FormValidator(settings, formEditProfile);
formEditProfileValidator.enableValidation();
//
//	кнопки открытия попапов, аватар и листенеры для них
//
const btnOpenEditProfilePopup = document.querySelector('.profile-info__edit-button');
btnOpenEditProfilePopup.addEventListener('click', () => {
	const userInfoFields = userInfo.getUserInfo();
	formEditProfileValidator.clearInputErrors();
	popupEditProfile.open();
	popupEditProfile.setInputValues(userInfoFields);
});

const btnOpenAddCardPopup = document.querySelector('.profile__add-button');
btnOpenAddCardPopup.addEventListener('click', () => {
	popupAddCard.open();
	formAddValidator.clearInputErrors();
	formAddValidator.toggleSubmitState();
});

const avatarOverlay = document.querySelector('.profile__avatar_overlay');
avatarOverlay.addEventListener('click', () => {
	popupEditAvatar.open();
});