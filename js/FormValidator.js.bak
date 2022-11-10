export class FormValidator {
	constructor(settings, validatedForm) {
		this._validatedForm = validatedForm;
		this._settings = settings;
		this._formInputList = Array.from(this._validatedForm.querySelectorAll(this._settings.inputSelector));
		this._submitButton = this._validatedForm.querySelector(this._settings.submitButtonSelector);
	}
	
	_hasInvalidInput() {
		return this._formInputList?.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	}
	
	toggleSubmitState() {
		//const submitButton = this._validatedForm.querySelector(this._settings.submitButtonSelector);
		
		if (this._hasInvalidInput()){
			this._submitButton.classList.add(this._settings.inactiveButtonClass);
			this._submitButton.disabled = true;
		} else {
			this._submitButton.classList.remove(this._settings.inactiveButtonClass);
			this._submitButton.disabled = false;
		}
	}
	
	_showInputError(inputElement, errorMessage) {
		const errorElement = this._validatedForm.querySelector(`#${inputElement.id}-error`);
		errorElement.textContent = errorMessage;
		inputElement.classList.add(this._settings.inputErrorClass);
	}
	
	_hideInputError(inputElement) {
		const errorElement = this._validatedForm.querySelector(`#${inputElement.id}-error`);
		errorElement.textContent = '';
		inputElement.classList.remove(this._settings.inputErrorClass);
	}
	
	_checkFieldValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement, inputElement.validationMessage);
		} else {
			this._hideInputError(inputElement);
		}
	}
	//
	//	очистить ошибки после предыдущего открытия
	//
	clearInputErrors() {
		this._formInputList.forEach((inputElement) => {
			this._validatedForm.querySelector(`#${inputElement.id}-error`).textContent = "";
			inputElement.classList.remove(this._settings.inputErrorClass);
		});
	}

	_setListeners() {
		this._formInputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkFieldValidity(inputElement);
				this.toggleSubmitState();
			});
		});
	}
	
	enableValidation() {
		this._setListeners();
		this.toggleSubmitState();
	}
}