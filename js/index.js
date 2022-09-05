const editButton  	 = document.querySelector('.ProfileInfo__EditButton');
const closeButton 	 = document.querySelector('.popup__close');
const popup		  	 = document.querySelector('.popup');
/*поля в шапке*/
let   nameInput   	 = document.querySelector('.ProfileInfo__header');
let   jobInput 	  	 = document.querySelector('.ProfileInfo__description');
/*поля в модалке*/
let   modalNameInput = document.querySelector('.popup__name');
let   modalJobInput  = document.querySelector('.popup__label');
let   popupContainer = document.querySelector('.popup__container');
//
// функция отображения popup
//
const showPopup = () => {
    popup.classList.add('popup_opened');
	modalNameInput.value = nameInput.textContent;
	modalJobInput.value = jobInput.textContent;
}
//
// функция закрытия popup
//
const closePopup = () => {
	popup.classList.remove('popup_opened');
}
//
// Обработчик «отправки» формы, хотя покаона никуда отправляться не будет
//
const formSubmitHandler = (evt) => {
    evt.preventDefault();
	nameInput.textContent = modalNameInput.value;
	jobInput.textContent  = modalJobInput.value;
	popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', showPopup);
closeButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', formSubmitHandler); 