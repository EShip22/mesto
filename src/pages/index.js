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
let userId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
	.then(([resGetUserInfo, resGetInitialCards]) => {
		userInfo.setUserInfo(resGetUserInfo.name, resGetUserInfo.about, resGetUserInfo.avatar);
		userId = resGetUserInfo._id;

		section.renderAll(resGetInitialCards);
	})
	.catch((err) => console.log(err));

const setLike = (cardId, card, isCardLikedByMe) => {
	if (card.isCardLikedByMe) {
		api.delLike(cardId)
			.then((res) => {
				card.removeLikeIcon();
				card.likes = res.likes;
				card.isCardLikedByMe = false;
				card.setLikeCnt(res.likes.length);
			})
			.catch((err) => console.log(err));
	} else {
		api.addLike(cardId)
			.then((res) => {
				card.addLikeIcon();
				card.likes = res.likes;
				card.setLikeCnt(res.likes.length);
				card.isCardLikedByMe = true;
			})
			.catch((err) => console.log(err));
	}
}

const addLike = (cardId) => {
	api.addLike(cardId);
}

const delLike = (cardId) => {
	api.delLike(cardId);
}

const submitAddCardForm = (formValues) => {
	popupAddCard.setSaveBtnValue('Сохранение...');
	api.addCard(formValues.fieldCaption, formValues.fieldLink)
		.then((res) => {
			const card = createCard({
					name: res.name,
					link: res.link,
					likes: null,
					id: res._id,
					userId: userId,
					ownerId: userId
				},
				tmpltSelector,
				handleCardClick,
				openDelCardPopup,
				setLike,
				addLike,
				delLike
			);

			section.addItem(card, true);
			popupAddCard.close();
		})
		.catch((err) => console.log(err))
		.finally((res) => {
			popupAddCard.setSaveBtnValue('Создать');
		});
}

const submitEditProfileForm = (formValues) => {
	popupEditProfile.setSaveBtnValue('Сохранение...');
	api.setUserInfo(formValues)
		.then((res) => {
			userInfo.setUserInfo(res.name, res.about, res.avatar);
			popupEditProfile.close();
		})
		.catch((err) => console.log(err))
		.finally((res) => {
			popupEditProfile.setSaveBtnValue('Сохранить');
		});
}

const submitEditAvatarForm = (formValues) => {
	popupEditAvatar.setSaveBtnValue('Сохранение...');
	api.setUserAvatar(formValues.avatarLink)
		.then((res) => {
				userInfo.avatar.src = res.avatar;
				popupEditAvatar.close();
		})
		.catch((err) => console.log(err))
		.finally((res) => {
			popupEditAvatar.setSaveBtnValue('Сохранить');
		});
}

const popupWithImage = new PopupWithImage('.popup_show-image');
popupWithImage.setEventListeners();

const handleCardClick = (name, link) => {
	popupWithImage.open(link, name);
}

const openDelCardPopup = (cardElem, id, delCard) => {
	popupDelCard.open(cardElem, id, delCard);
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
		setLike,
		addLike,
		delLike).generateCard();
		return newCard;
}

const userInfo = new UserInfo({
	userNameSelector: '.profile-info__header',
	userActivitySelector: '.profile-info__description',
	userAvatarSelector: '.profile__avatar'
});

const section = new Section(
	(data) => {
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
	}, '.elements');

//
//	формы, попапы с формой, валидация форм
//
const popupAddCard = new PopupWithForm('.popup_add-card', submitAddCardForm, settings);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_edit-profile', submitEditProfileForm, settings);
popupEditProfile.setEventListeners();

const popupDelCard = new PopupDelCard(
	'.popup_del-card',
	api.delCardQuery
);
popupDelCard.setEventListeners();

const popupEditAvatar = new PopupWithForm('.popup_edit-avatar', submitEditAvatarForm, settings);
popupEditAvatar.setEventListeners();

const formAddCard = document.querySelector('.popup__form_type_add');
const formAddValidator = new FormValidator(settings, formAddCard);
formAddValidator.enableValidation();

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formEditProfileValidator = new FormValidator(settings, formEditProfile);
formEditProfileValidator.enableValidation();

const formEditAvatar = document.querySelector('.popup__form_type_edit-avatar');
const formEditAvatarValidator = new FormValidator(settings, formEditAvatar);
formEditAvatarValidator.enableValidation();
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
	formEditAvatarValidator.clearInputErrors();
	formEditAvatarValidator.toggleSubmitState();
});