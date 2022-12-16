import {Popup} from './Popup.js';

export class PopupDelCard extends Popup {
	constructor(popupSelector, delCard) {
		super(popupSelector);
		this._delCard = delCard;
	}
	
	open(card, id, delCard) {
		this._cardId = id;
		this._delCard = delCard;
		super.open();
	}
	
	setEventListeners() {
		super.setEventListeners();
		this._popup.querySelector('.popup__save').addEventListener('click', () => {
				this._delCard(this._cardId);
		});
	}
}