import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
	
	constructor(popupSelector, submitAddCardForm, settings) {
		super(popupSelector);
		this._popup = document.querySelector(popupSelector);
		this._submitAddCardForm = submitAddCardForm;
		this._submitButton = this._popup.querySelector(settings.submitButtonSelector);
		this._formAdd =	document.querySelector('.popup__form_type_add');
	}
	
	_getInputValues() {
		this.cardNameValue = this._popup.querySelector('#caption-input').value;
		this.cardLinkValue = this._popup.querySelector('#link-input').value;
	}
	
	setEventListeners() {
		this._popup.querySelector('.popup__close_type_add').addEventListener('click', () => {
			this.close();
		});
		
		this._formAdd.addEventListener('submit', this._submitAddCardForm);
		
		document.addEventListener('keydown', super._handleEscClose.bind(this));
		
		this._popup.addEventListener('click', (evt) => {
			if (evt.target.classList.contains('popup')) {
				this.close();
			}
		});
	}
	
	close() {
		this._popup.classList.remove('popup_opened');
		this._getInputValues();
		this._popup.querySelector('#caption-input').value = '';
		this._popup.querySelector('#link-input').value = '';
	}
}