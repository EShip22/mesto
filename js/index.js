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
const btnOpenEditProfilePopup = document.querySelector('.profile-info__edit-button');
const closeButtonEditPopup = document.querySelector('.popup__close_type_edit');
const closeButtonAddPopup = document.querySelector('.popup__close_type_add');
const closeButtonImgPopup = document.querySelector('.popup__close_img');
const btnOpenAddCardPopup = document.querySelector('.profile__add-button');
// окна попапов
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupShowImg = document.querySelector('.popup_show-image');

const formEditProfile = document.querySelector('.edit-profile-form');
const formAddCard = document.querySelector('.add-card-form');
//	поля в шапке
const userName = document.querySelector('.profile-info__header');
const userJob = document.querySelector('.profile-info__description');
//	поля в модалке
const modalNameInput = document.querySelector('.edit-profile-form__input_field_name');
const modalJobInput = document.querySelector('.edit-profile-form__input_field_label');
const modalAddCardName = document.querySelector('.add-card-form__input_field_name');
const modalAddCardLink = document.querySelector('.add-card-form__input_field_link');
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
	renderCard(createCard(modalAddCardName.value, modalAddCardLink.value), true);
	closePopup(popupAddCard);
	clearAddPopupInputs();
}
//	добавление карточки
const cardElems = document.querySelector('.elements');
const elemTemplate = document.querySelector('.element-template').content;

const renderInitialCards = () => {
	initialCards.forEach(
		(elem) => {
			renderCard(createCard(elem.name, elem.link));
		});
}

const createCard = (title, imageLink) => {
	const newHtmlElement = elemTemplate.cloneNode(true); //клонируем шаблон
	const caption = newHtmlElement.querySelector('.element__caption');
	caption.textContent = title;
	const img = newHtmlElement.querySelector('.element__place');
	img.setAttribute('src', imageLink);
	img.setAttribute('alt', title);
	return newHtmlElement;
}

const renderCard = (card, isFirst = false) => {
	setListenersForItem(card);
	if (isFirst) {
		cardElems.prepend(card);
	} else {
		cardElems.append(card);
	}
}

const openPopup = (popup) => {
	popup.classList.add('popup_opened');
}

const openPopupEditProfile = () => {
	modalNameInput.value = userName.textContent;
	modalJobInput.value = userJob.textContent;
}

const openPopupImage = (img, imgText) => {
	popupImgImage.setAttribute('src', img);
	popupImgImage.setAttribute('alt', imgText);
	popupImgText.textContent = imgText;
}

const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
}

const clearAddPopupInputs = () => {
	modalAddCardName.value = '';
	modalAddCardLink.value = '';
}

const delCard = (delButton) => {
	const parentElem = delButton.parentNode;
	parentElem.remove();
}

const setListenersForItem = (element) => {
	const likeButton = element.querySelector('.element__like');
	likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_enabled'));
	const delButton = element.querySelector('.element__trash');
	delButton.addEventListener('click', () => delCard(delButton));
	const imgPlace = element.querySelector('.element__place');
	const imgText = element.querySelector('.element__caption').textContent;
	imgPlace.addEventListener('click', () => {
		openPopup(popupShowImg);
		openPopupImage(imgPlace.getAttribute('src'), imgText);
	});
}

renderInitialCards();

//	листенеры
btnOpenEditProfilePopup.addEventListener('click', () => {
	openPopup(popupEditProfile);
	openPopupEditProfile();
});
closeButtonEditPopup.addEventListener('click',() => closePopup(popupEditProfile));
closeButtonAddPopup.addEventListener('click',() => {
	closePopup(popupAddCard);
	clearAddPopupInputs();
});
closeButtonImgPopup.addEventListener('click',() => closePopup(popupShowImg));
formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', submitAddCardForm);
btnOpenAddCardPopup.addEventListener('click', () => openPopup(popupAddCard));