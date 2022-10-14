const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_type_error'
};

const getInputList = (formElement, settings) => {
	return Array.from(formElement.querySelectorAll(settings.inputSelector));
}

const hasInvalidInput = (inputList) => {
  return inputList?.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const setActiveButton = (formElement, settings, inputList) => {
	//const inputList = getInputList(formElement, settings);
	const submitButton = formElement.querySelector(settings.submitButtonSelector);
	if (hasInvalidInput(inputList)) {
		submitButton.classList.add(settings.inactiveButtonClass);
		submitButton.disabled = true;
	} else {
		submitButton.classList.remove(settings.inactiveButtonClass);
		submitButton.disabled = false;
	}
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
	showInputError(formElement, inputElement, inputElement.validationMessage);
	inputElement.classList.add(settings.inputErrorClass);
  } else {
    hideInputError(formElement, inputElement);
	inputElement.classList.remove(settings.inputErrorClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = getInputList(formElement, settings);//Array.from(formElement.querySelectorAll(settings.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
		checkInputValidity(formElement, inputElement, settings);
		setActiveButton(formElement, settings, inputList);
    });
  });
};

const clearInputErrors = (settings) => {
	if (settings) {
		const formList = Array.from(document.querySelectorAll(settings.formSelector));
		formList.forEach((formElement) => {
			const submitButton = formElement.querySelector(settings.submitButtonSelector);
			const inputList = getInputList(formElement, settings);
			inputList.forEach((inputElement) => {
				formElement.querySelector(`#${inputElement.id}-error`).textContent = "";
				inputElement.classList.remove(settings.inputErrorClass);
			});
		});
	} 
}

closeButtonEditPopup.addEventListener('click',() => closePopup(popupEditProfile, settings));

const enableValidation = (settings) => {
	const formList = Array.from(document.querySelectorAll(settings.formSelector));
	formList.forEach((formElement) => {
		formElement.addEventListener('submit', (evt) => {
		  evt.preventDefault();
		});
		setEventListeners(formElement, settings);
	});
}

enableValidation(settings);