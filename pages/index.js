import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {Popup} from '../components/Popup.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';
import * as constants from '../utils/constants.js';
import '../pages/index.css';

const settings = constants.settings;
const tmpltSelector = '.element-template';

const popupWithImage = new PopupWithImage('.popup_show-image');
popupWithImage.setEventListeners();

const handleCardClick = (name, link) => {
	popupWithImage.open(link, name);
}

const createCard = (name, link, tmpltSelector, handleCardClick) => {
	return new Card(name, link, tmpltSelector, handleCardClick).generateCard();
}

const userInfo = new UserInfo({
	userNameSelector: '.profile-info__header',
	userActivitySelector: '.profile-info__description'
});

const submitAddCardForm = (formValues) => {
	const card = createCard(
		formValues.fieldCaption,
		formValues.fieldLink,
		tmpltSelector,
		handleCardClick
	);
	section.addItem(card, true);
}

const submitEditProfileForm = (formValues) => {
	userInfo.setUserInfo(formValues.fieldName, formValues['fieldActivityCategory']);
}

const section = new Section({
	items: constants.initialCards, 
	renderer: (card) => {
		const newCard = createCard(card.name, card.link, tmpltSelector, handleCardClick);
		section.addItem(newCard);
	}}, '.elements');
section.renderAll();
//
//	формы, попапы с формой, валидация форм
//
const popupAddCard = new PopupWithForm('.popup_add-card', submitAddCardForm, settings);
popupAddCard.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_edit-profile', submitEditProfileForm, settings);
popupEditProfile.setEventListeners();

const formAddCard = document.querySelector('.popup__form_type_add');
const formAddValidator = new FormValidator(settings, formAddCard);
formAddValidator.enableValidation();

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formEditProfileValidator = new FormValidator(settings, formEditProfile);
formEditProfileValidator.enableValidation();
//
//	кнопки открытия попапов и листенеры для них
//
const btnOpenEditProfilePopup = document.querySelector('.profile-info__edit-button');
btnOpenEditProfilePopup.addEventListener('click', () => {
	const userInfoFields = userInfo.getUserInfo();
	formEditProfileValidator.clearInputErrors();
	popupEditProfile.open();
	popupEditProfile.setInputValues(userInfoFields, settings);
});

const btnOpenAddCardPopup = document.querySelector('.profile__add-button');
btnOpenAddCardPopup.addEventListener('click', () => {
	popupAddCard.open();
	formAddValidator.clearInputErrors();
	formAddValidator.toggleSubmitState();
});