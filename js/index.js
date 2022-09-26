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
const closeButtonEditPopup 	  = document.querySelector('.popup__close_type_edit');
const closeButtonAddPopup     = document.querySelector('.popup__close_type_add');
const closeButtonImgPopup     = document.querySelector('.popup__close_img');
const btnOpenAddCardPopup     = document.querySelector('.profile__add-button');
const popupEditProfile	  	  = document.querySelector('.popup_edit-profile');
const popupAddCard	  	 	  = document.querySelector('.popup_add-card');
const popupShowImg 			  = document.querySelector('.popup_show-image');
const formEditProfile 	   	  = document.querySelector('.edit-profile-form');
const formAddCard 	   	   	  = document.querySelector('.add-card-form');
//	поля в шапке
const userName   	 	   	  = document.querySelector('.profile-info__header');
const userJob 	  	 	      = document.querySelector('.profile-info__description');
//	поля в модалке
const modalNameInput 	      = document.querySelector('.edit-profile-form__input_field_name');
const modalJobInput  	      = document.querySelector('.edit-profile-form__input_field_label');
const modalAddCardName	      = document.querySelector('.add-card-form__input_field_name');
const modalAddCardLink	      = document.querySelector('.add-card-form__input_field_link');
const popupImgImage			  =	document.querySelector('.popup__img');
const popupImgText			  = document.querySelector('.popup__text');
//
//	Обработчик «отправки» формы для редактирования профиля, хотя пока она никуда отправляться не будет
//
const submitEditProfileForm = (evt) => {
    evt.preventDefault();
	//	текст
	userName.textContent = modalNameInput.value;
	userJob.textContent  = modalJobInput.value;
	//	закрыть попап
	popupEditProfile.classList.remove('popup_opened');
}
//
//	Обработчик «отправки» формы для добавления карточки, хотя пока она никуда отправляться не будет
//
const submitAddCardForm = (evt) => {
    evt.preventDefault();
	//	отрисовка карточек
	renderCard(createCard(modalAddCardName.value, modalAddCardLink.value), true);
	//	закрыть попап
	popupAddCard.classList.remove('popup_opened');
	//	очистить поля ввода
	clearAddPopupInputs();
}
//	добавление карточки
const cardElems    = document.querySelector('.elements');
const elemTemplate = document.querySelector('.element-template').content;
//
//	функция для отрисовки всех карточек из массива
//
const renderInitialCards = () => {
	initialCards.forEach(
		(elem) => {
			//	создать новую карточку
			renderCard(createCard(elem.name, elem.link));
		});
}
//
//	функция для создания карточки
//	title - заголовок
//	imageLink - ссылка на картинку
//
const createCard = (title, imageLink) => {
	const newHtmlElement = elemTemplate.cloneNode(true); //клонируем шаблон
	const caption = newHtmlElement.querySelector('.element__caption');
	caption.textContent = title;
	const img = newHtmlElement.querySelector('.element__place');
	img.setAttribute('src', imageLink);
	img.setAttribute('alt', title);
	return newHtmlElement;
}
//
//	функция для рендеринг карточки
//	card - нужная карточка
//	isFirst - true - отобразить в начале; false - в конце
//
const renderCard = (card, isFirst = false) => {
	setListenersForItem(card);
	if (isFirst) {
		cardElems.prepend(card);
	} else {
		cardElems.append(card);
	}
}
//
//	функция открытия любого попапа
//	popup - нужный попап
//
const openPopup = (popup) => {
	document.querySelector(`.${popup}`).classList.add('popup_opened');
}
//
//	дополнение к функции openPopup, только для открытия попапа редактирования профиля
//
const openPopupEditProfile = () => {
	modalNameInput.value = userName.textContent;
	modalJobInput.value = userJob.textContent;
}
//
//	дополнение к функции openPopup, только для открытия попапа с изображением
//
const openPopupImage = (img, imgText) => {
	popupImgImage.setAttribute('src', img);
	popupImgText.textContent = imgText;
}
//
//	функция закрытия любого попапа
//	popup - нужный попап
//
const closePopup = (popup) => {
	popup.classList.remove('popup_opened');
}
//
//	функция по очистке полей из попапа добавления карточки
//
const clearAddPopupInputs = () => {
	modalAddCardName.value = '';
	modalAddCardLink.value = '';
}
//
//	функция удаляет карточку
//	delButton - кнопка помойки, по ней опредляется сама карточка
//
const delCard = (delButton) => {
	const parentElem = delButton.parentNode;
	parentElem.remove();
}
//
//	функция установки листенера для повторяющихся кнопок
//	element - элемент, в котором находится нужная кнопка
//
const setListenersForItem = (element) => {
	const likeButton = element.querySelector('.element__like');
	likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_enabled'));
	const delButton = element.querySelector('.element__trash');
	delButton.addEventListener('click', () => delCard(delButton));
	const imgPlace = element.querySelector('.element__place');
	const imgText = element.querySelector('.element__caption').textContent;
	imgPlace.addEventListener('click', () => {
		openPopup('popup_show-image');
		openPopupImage(imgPlace.getAttribute('src'), imgText);
	});
}

renderInitialCards();

//	листенеры
btnOpenEditProfilePopup.addEventListener('click', () => {
	openPopup('popup_edit-profile');
	openPopupEditProfile();
});
closeButtonEditPopup.addEventListener('click',() => closePopup(document.querySelector('.popup_edit-profile')));
closeButtonAddPopup.addEventListener('click',() => {
	closePopup(document.querySelector('.popup_add-card'));
	clearAddPopupInputs();
});
closeButtonImgPopup.addEventListener('click',() => closePopup(popupShowImg));
formEditProfile.addEventListener('submit', submitEditProfileForm);
formAddCard.addEventListener('submit', submitAddCardForm);
btnOpenAddCardPopup.addEventListener('click', () => openPopup('popup_add-card'));