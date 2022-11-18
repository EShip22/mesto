export class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
	}
	
	open() {
		this._popup.classList.add('popup_opened');
	}
	
	close() {
		this._popup.classList.remove('popup_opened');
		document.removeEventListener('click', this._handleEscClose.bind(this));
	}
	
	_handleEscClose(evt) {
		if (evt.code === 'Escape') {
			this.close();
		}
	}

	setEventListeners() {
		//	закрытие по крестику
		this._popup.querySelector('.popup__close').addEventListener('click', () => {
			this.close();
		});
		//	закрытие по ESC
		document.addEventListener('keydown', this._handleEscClose.bind(this));
		//	закрытие по области
		this._popup.addEventListener('click', (evt) => {
			if (evt.target.classList.contains('popup')) {
				this.close();
			}
		});
	}
}