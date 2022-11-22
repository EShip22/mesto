import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImgImage	= document.querySelector('.popup__img');
		this._popupImgText = document.querySelector('.popup__text');
	}
	
	open(img, imgText) {
		super.open();
		this._popupImgImage.setAttribute('src', img);
		this._popupImgImage.setAttribute('alt', imgText);
		this._popupImgText.textContent = imgText;
	}
}