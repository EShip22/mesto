import {Popup} from './Popup.js';

export class PopupDelCard extends Popup {
	constructor(popupSelector, delCardQuery) {
		super(popupSelector);
		this._delCardQuery = delCardQuery;
	}
	
	open(cardElem, id, delCard) {
		this._openElem = cardElem;
		this._cardId = id;
		this._delCard = delCard;
		super.open();
	}
	
	setEventListeners() {
		super.setEventListeners();
		this._popup.querySelector('.popup__save').addEventListener('click', () => {
			this._delCardQuery(this._cardId)
				.then((res) => {
					this._delCard(this._openElem);
				})
				.catch((err) => console.log(err));
			super.close();
		});
	}
}