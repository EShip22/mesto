export class Card {
	constructor(name, imageLink, tmpltSelector, openPopup, fillPopupImage) {
		this._name = name;
		this._imageLink = imageLink;
		this._template = document.querySelector(tmpltSelector).content.querySelector('.element');
		this._openPopup = openPopup;
		this._fillPopupImage = fillPopupImage;
	}

	_getTemplate() {
		const _cardElement = this._template.cloneNode(true);
		return _cardElement;
	}
	
	_delCard() {
		this._element.remove()
	}
	
	_openCard() {
		this._openPopup();
		this._fillPopupImage();
	}
	
	_setLike() {
		this._likeButton.classList.toggle('element__like_enabled');
	}
	
	_addListeners() {
		//	изображение
		this._element.querySelector('.element__place').addEventListener('click', () => {
			this._openCard();
		});
		//	помойка
		this._element.querySelector('.element__trash').addEventListener('click', () => {
			this._delCard();
		});
		//	лайк
		this._likeButton.addEventListener('click', () => {
			this._setLike();
		});
	}

	generateCard() {
		this._element = this._getTemplate();
		this._likeButton = this._element.querySelector('.element__like');
		this._element.querySelector('.element__place').src = this._imageLink;
		this._element.querySelector('.element__caption').textContent = this._name;
		this._addListeners();
		return this._element;
	}
}