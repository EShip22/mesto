import {Popup} from './Popup.js';

export class PopupDelCard extends Popup {
	constructor(popupSelector, delCard) {
		super(popupSelector);
		this._popup = document.querySelector(popupSelector);
		this._delCard = delCard;
	}
	
	open(cardElem, id) {
		this._openElem = cardElem;
		this._cardId = id;
		super.open();
	}
	
	setEventListeners() {
		super.setEventListeners();
		this._popup.querySelector('.popup__save').addEventListener('click', () => {
			this._delCard(this._cardId);
			this._openElem.remove();
			super.close();
		});
	}
}