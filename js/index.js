const editButton  	 = document.querySelector('.profile-info__edit-button');
const closeButton 	 = document.querySelector('.popup__close');
const popup		  	 = document.querySelector('.popup');
/*поля в шапке*/
let   nameInput   	 = document.querySelector('.profile-info__header');
let   jobInput 	  	 = document.querySelector('.profile-info__description');
/*поля в модалке*/
let   modalNameInput = document.querySelector('.edit-profile-form__input_field_name');
let   modalJobInput  = document.querySelector('.edit-profile-form__input_field_label');
let   popupContainer = document.querySelector('.edit-profile-form');
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
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
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