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

export {initialCards, settings};