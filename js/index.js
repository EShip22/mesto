import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error'
};

const tmplt = document.querySelector('.element-template').content.querySelector('.element');

initialCards.forEach((elem) => {
	const card2 = new Card(elem.name, elem.link, tmplt);
	card2.generateCard();
	card2.renderCard();
});

const addForm = document.querySelector('.popup__form_type_add');
const editProfileForm = document.querySelector('.popup__form_type_edit-profile');
const popupList = Array.from(document.querySelectorAll('.popup'));
const btnOpenEditProfilePopup = document.querySelector('.profile-info__edit-button');
const closeButtonEditPopup = document.querySelector('.popup__close_type_edit');
const closeButtonAddPopup = document.querySelector('.popup__close_type_add');
const closeButtonImgPopup = document.querySelector('.popup__close_img');
const btnOpenAddCardPopup = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
export const popupShowImg = document.querySelector('.popup_show-image');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formAddCard = document.querySelector('.popup__form_type_add');
const userName = document.querySelector('.profile-info__header');
const userJob = document.querySelector('.profile-info__description');
const modalNameInput = document.querySelector('.popup__input_field_name');
const modalJobInput = document.querySelector('.popup__input_field_activity-category');
const modalAddCardName = formAddCard.querySelector('#caption-input');
const modalAddCardLink = formAddCard.querySelector('#link-input');
const modalAddCardCreate = formAddCard.querySelector('.popup__save');
const popupImgImage	= document.querySelector('.popup__img');
const popupImgText = document.querySelector('.popup__text');

const submitEditProfileForm = (evt) => {
    evt.preventDefault();
	userName.textContent = modalNameInput.value;
	userJob.textContent = modalJobInput.value;
	closePopup(popupEditProfile);
}

const submitAddCardForm = (evt) => {
    evt.preventDefault();
	const card = new Card(modalAddCardName.value, modalAddCardLink.value, tmplt);
	card.generateCard();
	card.renderCard(true);
	closePopup(popupAddCard);
	clearAddPopupInputs();
	modalAddCardCreate.classList.add('popup__save_disabled');
	modalAddCardCreate.disabled = true;
}

const closeESCPopup = (evt) => {
	if (evt.code === 'Escape') {
		// ищем открытый попап, т.к. входным параметром не получается его передать
		const popupOpend = document.querySelector('.popup_opened');
		closePopup(popupOpend, settings);
	}
}

export const openPopup = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', closeESCPopup);
}

const closePopup = (popup, settings = null) => {
	popup.classList.remove('popup_opened');
	document.removeEventListener('click', closeESCPopup);
}

const fillInputsPopupEditProfile = () => {
	modalNameInput.value = userName.textContent;
	modalJobInput.value = userJob.textContent;
}

export const fillPopupImage = (img, imgText) => {
	popupImgImage.setAttribute('src', img);
	popupImgImage.setAttribute('alt', imgText);
	popupImgText.textContent = imgText;
}

const clearAddPopupInputs = () => {
	modalAddCardName.value = '';
	modalAddCardLink.value = '';
}

export const delCard = (rootCardElem) => {
	rootCardElem.remove();
}

const setListenersForItem = (element) => {
	const likeButton = element.querySelector('.element__like');
	likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_enabled'));
	const delButton = element.querySelector('.element__trash');
	const rootCardElem = element.querySelector('.element');
	delButton.addEventListener('click',  () => {delCard(element)});
	const imgPlace = element.querySelector('.element__place');
	const imgText = element.querySelector('.element__caption').textContent;
	imgPlace.addEventListener('click', () => {
		openPopup(popupShowImg);
		fillPopupImage(imgPlace.getAttribute('src'), imgText);
	});
}

//	листенеры
btnOpenEditProfilePopup.addEventListener('click', () => {
	openPopup(popupEditProfile);
	fillInputsPopupEditProfile();
	const formEditProfileValidator = new FormValidator(settings, editProfileForm);
	formEditProfileValidator.enableValidation();
});
closeButtonEditPopup.addEventListener('click',() => closePopup(popupEditProfile));
closeButtonAddPopup.addEventListener('click',() => {
	closePopup(popupAddCard, settings);
});
closeButtonImgPopup.addEventListener('click',() => closePopup(popupShowImg));
formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', submitAddCardForm);
btnOpenAddCardPopup.addEventListener('click', () => {
	openPopup(popupAddCard);
	clearAddPopupInputs();
	const formAddValidator = new FormValidator(settings, addForm);
	formAddValidator.enableValidation();
});
popupList.forEach((popupElement) => {
	popupElement.addEventListener('click', (evt) => {
		if (evt.target.classList.contains('popup')) {
			closePopup(popupElement, settings);
		}
	});
	popupElement.addEventListener('animationend', () => {
		popupElement.classList.remove('popup_closed-animation');
	});
});