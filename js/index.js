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
const editButton  	 	   = document.querySelector('.profile-info__edit-button');
const closeButtonEditPopup = document.querySelector('.popup__close_type_edit');
const closeButtonAddPopup  = document.querySelector('.popup__close_type_add');
const closeButtonImgPopup  = document.querySelector('.popup__close_img');
const addButton		 	   = document.querySelector('.profile__add-button');
const popupEdit	  	 	   = document.querySelector('.popup_edit-profile');
const popupAdd	  	 	   = document.querySelector('.popup_add-card');
const popupEditForm 	   = document.querySelector('.edit-profile-form');
const popupAddForm 	   	   = document.querySelector('.add-card-form');
/*поля в шапке*/
let   nameInput   	 	   = document.querySelector('.profile-info__header');
let   jobInput 	  	 	   = document.querySelector('.profile-info__description');
/*поля в модалке*/
let   modalNameInput 	   = document.querySelector('.edit-profile-form__input_field_name');
let   modalJobInput  	   = document.querySelector('.edit-profile-form__input_field_label');
let   modalAddCardName	   = document.querySelector('.add-card-form__input_field_name');
let   modalAddCardLink	   = document.querySelector('.add-card-form__input_field_link');
//
//	Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
//
const formSubmitHandlerEdit = (evt) => {
    evt.preventDefault();
	/*текст*/
	nameInput.textContent = modalNameInput.value;
	jobInput.textContent  = modalJobInput.value;
	/*закрыть попап*/
	popupEdit.classList.remove('popup_opened');
}
const formSubmitHandlerAdd = (evt) => {
    evt.preventDefault();
	console.log('зашли');
	/*карточки*/
	renderItem(modalAddCardName.value, modalAddCardLink.value, true);
	/*закрыть попап*/
	popupAdd.classList.remove('popup_opened');
}
/*добавление карточки*/
const cardElems    = document.querySelector('.elements');
const elemTemplate = document.querySelector('.element-template').content;
//
//	функция для отрисовки всех карточек из массива
//
const render = () => {
	initialCards.forEach(
		(elem) => {
			renderItem(elem.name, elem.link);
		});
}
//
//  функция для отрисовки одной карточки
//	iName - название карточки
//	iLink - ссылка на изображение
//
const renderItem = (iName, iLink, iIsFirst = false) => {
	const newHtmlElement = elemTemplate.cloneNode(true); //клонируем шаблон
	const caption = newHtmlElement.querySelector('.element__caption');
	caption.textContent = iName;
	const img = newHtmlElement.querySelector('.element__place');
	img.setAttribute('src', iLink);
	img.setAttribute('alt', iName);
	setListenersForItem(newHtmlElement);
	//в зависимости от параметра, добавляем карточку в начало (по кнопке) или в конец (из массива)
	if (iIsFirst) {
		cardElems.prepend(newHtmlElement);
	} else {
		cardElems.append(newHtmlElement);
	}
}
//
//	фукция определяет попап по наименованию модификатора
//	iPopup - наименование класса модификатора
//
const getPopupByModifName = (iPopup) => {
	return document.querySelector(`.${iPopup}`);
}
//
//	функция открытия любого попапа
//	iPopup - нужный попап
//	iImg - картинка для попапа с изображением
//
const openPopup = (iPopup, iImg = '', iImgText = '') => {
	getPopupByModifName(iPopup).classList.add('popup_opened');
	modalNameInput.value = nameInput.textContent;
	modalJobInput.value = jobInput.textContent;
	console.log(iImg);
	if (iPopup === 'popup_show-image') {
		let popupShowImg = getPopupByModifName('popup_show-image');
		console.log("зашли");
		popupShowImg.querySelector('.popup__img').setAttribute('src', iImg);
		popupShowImg.querySelector('.popup__text').textContent = iImgText;
	}
}
//
//	функция закрытия любого попапа
//	iPopup - нужный попап
//
const closePopup = (iPopup) => {
	getPopupByModifName(iPopup).classList.remove('popup_opened');
}
//
//	функция удаляет карточку
//	iDelButton - кнопка помойки, по ней опредляется сама карточка
//
const delCard = (iDelButton) => {
	const parentElem = iDelButton.parentNode;
	parentElem.remove();
}
//
//	функция установки листенера для повторяющихся кнопок
//	iElement - элемент, в котором находится нужная кнопка
//
const setListenersForItem = (iElement) => {
	const likeButton = iElement.querySelector('.element__like');
	likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_enabled'));
	const delButton = iElement.querySelector('.element__trash');
	delButton.addEventListener('click', () => delCard(delButton));
	const imgPlace = iElement.querySelector('.element__place');
	const imgText = iElement.querySelector('.element__caption').textContent;
	console.log(imgText);
	imgPlace.addEventListener('click', () => openPopup('popup_show-image', imgPlace.getAttribute('src'), imgText));
}

render();

/*листенеры*/
editButton.addEventListener('click', () => openPopup('popup_edit-profile'));
closeButtonEditPopup.addEventListener('click',() => closePopup('popup_edit-profile'));
closeButtonAddPopup.addEventListener('click',() => closePopup('popup_add-card'));
closeButtonImgPopup.addEventListener('click',() => closePopup('popup_show-image'));
popupEditForm.addEventListener('submit', formSubmitHandlerEdit);
popupAddForm.addEventListener('submit', formSubmitHandlerAdd);
addButton.addEventListener('click', () => openPopup('popup_add-card'));