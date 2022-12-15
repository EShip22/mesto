import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
	constructor(popupSelector, submitForm, settings) {
		super(popupSelector);
		this._form = this._popup.querySelector(settings.formSelector);
		this._submitForm = submitForm;
		this._submitButton = this._popup.querySelector(settings.submitButtonSelector);
		this._formInputList = Array.from(this._popup.querySelectorAll(settings.inputSelector));
		this._settings = settings;
	}
	
	_getInputValues() {
		const inputValues = {};
		this._formInputList.forEach((input) => {
			inputValues[input.name] = input.value;
		});
		return inputValues;
	}
	
	setInputValues(inputValues) {
		this._formInputList.forEach((input) => {
			input.value = inputValues[input.name];
		});
	}
	
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitForm(this._getInputValues());
		});
	}
	
	close() {
		super.close();
		this._form.reset();
	}
	
	setSaveBtnValue(value) {
		this._popup.querySelector(this._settings.submitButtonSelector).value = value;
	}
}

