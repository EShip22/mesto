import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
	constructor(popupSelector, submitForm, settings) {
		super(popupSelector);
		this._popup = document.querySelector(popupSelector);
		this._form = this._popup.querySelector(settings.formSelector);
		this._submitForm = submitForm;
		this._submitButton = this._popup.querySelector(settings.submitButtonSelector);
		this._formInputList = Array.from(this._popup.querySelectorAll(settings.inputSelector));
	}
	
	_getInputValues() {
		const inputValues = {};
		this._formInputList.forEach((input) => {
			inputValues[input.name] = input.value;
		});
		return inputValues;
	}
	
	setInputValues(inputValues, settings) {
		this._formInputList.forEach((input) => {
			const elem = inputValues.find(item => item.inputName == input.name);
			input.value = elem.value;
		});
	}
	
	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitForm(this._getInputValues());
			this.close();
		});
	}
	
	close() {
		super.close();
		if (this._form.name == 'add-card-form') {
			this._form.querySelector('#caption-input').value = '';
			this._form.querySelector('#link-input').value = '';
		}
	}
}

