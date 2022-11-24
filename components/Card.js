export class Card {

	constructor(name, imageLink, tmpltSelector, handleCardClick) {
		this._name = name;
		this._imageLink = imageLink;
		this._template = document.querySelector(tmpltSelector).content.querySelector('.element');
		this._handleCardClick = handleCardClick;
	}

	_getTemplate() {
		const _cardElement = this._template.cloneNode(true);
		return _cardElement;
	}
	
	_delCard() {
		this._element.remove()
	}
	
	_openCard() {
		this._handleCardClick(this._name, this._imageLink);
	}
	
	_setLike() {
		this._likeButton.classList.toggle('element__like_enabled');
	}
	
	_addListeners() {
		//	изображение
		this._img.addEventListener('click', () => {
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
		this._img = this._element.querySelector('.element__place');
		this._img.src = this._imageLink;
		this._img.alt = this._name;
		this._element.querySelector('.element__caption').textContent = this._name;
		this._addListeners();
		return this._element;
	}
}