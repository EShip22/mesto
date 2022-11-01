import {openPopup, popupShowImg, fillPopupImage, delCard} from './index.js';

export class Card {
	constructor(name, imageLink, template){
		this._name = name;
		this._imageLink = imageLink;
		this._template = template;
	}

	_getTemplate(){
		const _cardElement = this._template.cloneNode(true);
		return _cardElement;
	}
	
	_addListeners(){
		const _likeButton = this._element.querySelector('.element__like');
		//изображение
		this._element.querySelector('.element__place').addEventListener('click', () => {
			openPopup(popupShowImg);
			fillPopupImage(this._imageLink, this._name);
		});
		//помойка
		this._element.querySelector('.element__trash').addEventListener('click', () => {
			delCard(this._element);
		});
		//лайк
		_likeButton.addEventListener('click', () => _likeButton.classList.toggle('element__like_enabled'));
	}

	generateCard(){
		this._element = this._getTemplate();
		this._element.querySelector('.element__place').src = this._imageLink;
		this._element.querySelector('.element__caption').textContent = this._name;
		this._addListeners();
		return this._element;
	}
	
	renderCard(isFirst = false){
		const _cardElems = document.querySelector('.elements');
		if (isFirst) {
			_cardElems.prepend(this._element);
		} else {
			_cardElems.append(this._element);
		}
	}
}