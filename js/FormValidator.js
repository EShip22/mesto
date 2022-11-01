export class FormValidator {
	constructor(settings, validatedForm){
		this._validatedForm = validatedForm;
		this._settings = settings;
	}
	//массив полей input в валидируемой форме
	_getFormInputList() {
		return Array.from(this._validatedForm.querySelectorAll(this._settings.inputSelector));
	}
	
	_setActiveSubmit() {
		const submitButton = this._validatedForm.querySelector(this._settings.submitButtonSelector);

		//проверка, есть ли невалидный инпут на форме
		const hasInvalidInput = (inputList) => {
		    return inputList?.some((inputElement) => {
				return !inputElement.validity.valid;
		    });
		}

		if (hasInvalidInput(this._getFormInputList())){
			submitButton.classList.add(this._settings.inactiveButtonClass);
			submitButton.disabled = true;
		} else {
			submitButton.classList.remove(this._settings.inactiveButtonClass);
			submitButton.disabled = false;
		}
	}
	
	_checkFieldValidity(inputElement) {
		const showInputError = (inputElement, errorMessage) => {
			const errorElement = this._validatedForm.querySelector(`#${inputElement.id}-error`);
			errorElement.textContent = errorMessage;
		}
		
		const hideInputError = (inputElement) => {
			const errorElement = this._validatedForm.querySelector(`#${inputElement.id}-error`);
			errorElement.textContent = '';
		}
		
		if (!inputElement.validity.valid) {
			showInputError(inputElement, inputElement.validationMessage);
			inputElement.classList.add(this._settings.inputErrorClass);
		} else {
			hideInputError(inputElement);
			inputElement.classList.remove(this._settings.inputErrorClass);
		}
	}
	//
	//	очистить ошибки после предыдущего открытия
	//
	_clearInputErrors() {
		if (this._settings) {
			this._getFormInputList().forEach((inputElement) => {
				this._validatedForm.querySelector(`#${inputElement.id}-error`).textContent = "";
				inputElement.classList.remove(this._settings.inputErrorClass);
			});
		}
	}

	_setListeners() {
		this._getFormInputList().forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkFieldValidity(inputElement);
				this._setActiveSubmit();
			});
		});
	}
	
	enableValidation() {
		this._clearInputErrors();
		this._setListeners();
		this._setActiveSubmit();
	}
}