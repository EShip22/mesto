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
const popupList = Array.from(document.querySelectorAll('.popup'));

const btnOpenEditProfilePopup = document.querySelector('.profile-info__edit-button');
const closeButtonEditPopup = document.querySelector('.popup__close_type_edit');
const closeButtonAddPopup = document.querySelector('.popup__close_type_add');
const closeButtonImgPopup = document.querySelector('.popup__close_img');
const btnOpenAddCardPopup = document.querySelector('.profile__add-button');
// окна попапов
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const popupShowImg = document.querySelector('.popup_show-image');

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const formAddCard = document.querySelector('.popup__form_type_add');
//	поля в шапке
const userName = document.querySelector('.profile-info__header');
const userJob = document.querySelector('.profile-info__description');
//	поля в модалке
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
	renderCard(createCard(modalAddCardName.value, modalAddCardLink.value), true);
	closePopup(popupAddCard);
	clearAddPopupInputs();
	modalAddCardCreate.classList.add('popup__save_disabled');
	modalAddCardCreate.disabled = true;
}
//	добавление карточки
const cardElems = document.querySelector('.elements');
const elemTemplate = document.querySelector('.element-template').content;

const renderInitialCards = () => {
	initialCards.forEach(
		(elem) => {
			renderCard(createCard(elem.name, elem.link));
		}
	);
}

const createCard = (title, imageLink) => {
	const newHtmlElement = elemTemplate.querySelector('.element').cloneNode(true); //клонируем шаблон
	const caption = newHtmlElement.querySelector('.element__caption');
	caption.textContent = title;
	const img = newHtmlElement.querySelector('.element__place');
	img.setAttribute('src', imageLink);
	img.setAttribute('alt', title);
	setListenersForItem(newHtmlElement);
	return newHtmlElement;
}

const renderCard = (card, isFirst = false) => {
	if (isFirst) {
		cardElems.prepend(card);
	} else {
		cardElems.append(card);
	}
}

const closeESCPopup = (evt) => {
	if (evt.code === 'Escape') {
		// ищем открытый попап, т.к. входным параметром не получается его передать
		const popupOpend = document.querySelector('.popup_opened');
		closePopup(popupOpend, settings);
	}
}

const openPopup = (popup) => {
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

const fillPopupImage = (img, imgText) => {
	popupImgImage.setAttribute('src', img);
	popupImgImage.setAttribute('alt', imgText);
	popupImgText.textContent = imgText;
}

const clearAddPopupInputs = () => {
	modalAddCardName.value = '';
	modalAddCardLink.value = '';
}

const delCard = (rootCardElem) => {
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

renderInitialCards();

//	листенеры
btnOpenEditProfilePopup.addEventListener('click', () => {
	openPopup(popupEditProfile);
	fillInputsPopupEditProfile();
	setActiveButton(popupEditProfile.querySelector('.popup__form'), settings, null);
	clearInputErrors(settings);
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
	clearInputErrors(settings);
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