import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {Section} from './Section.js';
import {Popup} from './Popup.js';
import {PopupWithImage} from './PopupWithImage.js';
import {PopupWithForm} from './PopupWithForm.js';
import {UserInfo} from './UserInfo.js';
import '../pages/index.css';

const arhizImage = new URL('../images/Atlantic.png', import.meta.url);
const hallstatImage = new URL('../images/Hallstat.jpg', import.meta.url);
const pattayaImage = new URL('../images/Pattaya.jpg', import.meta.url);
const karelyaImage = new URL('../images/Karelya.jpg', import.meta.url);
const moscowImage = new URL('../images/Moscow.jpg', import.meta.url);
const shladmingImage = new URL('../images/Shladming.jpg', import.meta.url);

const initialCards = [
  {
    name: 'Атлантический океан',
    link: arhizImage
  },
  {
    name: 'Гальштат',
    link: hallstatImage
  },
  {
    name: 'Паттайя',
    link: pattayaImage
  },
  {
    name: 'Карелия',
    link: karelyaImage
  },
  {
    name: 'Москва',
    link: moscowImage
  },
  {
    name: 'Шладминг',
    link: shladmingImage
  }
];

//настройки валидации
const settings = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__save',
	inactiveButtonClass: 'popup__save_disabled',
	inputErrorClass: 'popup__input_type_error'
};

const tmpltSelector = '.element-template';

const handleCardClick = (name, link) => {
	const popup = new Popup('.popup_show-image');
	popup.open();
	popup.setEventListeners();
	const popupWithImage = new PopupWithImage();
	popupWithImage.open(link, name);
}

const section = new Section({
	items: initialCards, 
	renderer: (card) => {
		const newCard = new Card(card.name,  card.link, tmpltSelector, handleCardClick);
		section.addItem(newCard.generateCard())
	}}, '.elements');
section.renderAll();

const addForm = document.querySelector('.popup__form_type_add');
const editProfileForm = document.querySelector('.popup__form_type_edit-profile');

const formEditProfileValidator = new FormValidator(settings, editProfileForm);
formEditProfileValidator.enableValidation();

const formAddValidator = new FormValidator(settings, addForm);
formAddValidator.clearInputErrors();
formAddValidator.enableValidation();

const btnOpenEditProfilePopup = document.querySelector('.profile-info__edit-button');
const btnOpenAddCardPopup = document.querySelector('.profile__add-button');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const popupEditProfile = new Popup('.popup_edit-profile');

const userInfo = new UserInfo({
	userNameSelector: '.profile-info__header',
	userActivitySelector: '.profile-info__description'
});

const submitEditProfileForm = (evt) => {
	evt.preventDefault();
	userInfo.setUserInfo();
	popupEditProfile.close();
}

const submitAddCardForm = (evt) => {
	evt.preventDefault();
	const popupWithForm = new PopupWithForm('.popup_add-card', submitAddCardForm, settings);
	popupWithForm.close();
	const card = new Card(
		popupWithForm.cardNameValue,
		popupWithForm.cardLinkValue,
		tmpltSelector,
		handleCardClick);
	section.addItem(card.generateCard(), true);
}

//	листенеры
btnOpenEditProfilePopup.addEventListener('click', () => {
	formEditProfileValidator.clearInputErrors();
	const userInfoFields = userInfo.getUserInfo();
	userInfo.fillInputsPopupUserInfo(userInfoFields);
	popupEditProfile.open();
	popupEditProfile.setEventListeners();
});

formEditProfile.addEventListener('submit', submitEditProfileForm);

btnOpenAddCardPopup.addEventListener('click', () => {
	const popup = new Popup('.popup_add-card');
	popup.open();
	const popupWithForm = new PopupWithForm('.popup_add-card', submitAddCardForm, settings);
	popupWithForm.setEventListeners();
	formAddValidator.clearInputErrors();
	formAddValidator.toggleSubmitState();
});