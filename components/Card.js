export class Card {

	constructor(props, tmpltSelector, handleCardClick, openDelCardPopup, addLike, delLike) {
		this._name = props.name;
		this._imageLink = props.link;
		this._likes = props.likes;
		this._id = props.id;
		this._userId = props.userId;
		this._ownerId = props.ownerId;
		this.isCardLikedByMe = this._likes?.find(user => this._userId === user._id) ? true : false;
		
		this._template = document.querySelector(tmpltSelector).content.querySelector('.element');
		this._handleCardClick = handleCardClick;
		this._openDelCardPopup = openDelCardPopup;
		this._addLike = addLike;
		this._delLike = delLike;
	}

	_getTemplate() {
		const _cardElement = this._template.cloneNode(true);
		return _cardElement;
	}
	
	_openCard() {
		this._handleCardClick(this._name, this._imageLink);
	}
	
	_addListeners() {
		//	изображение
		this._img.addEventListener('click', () => {
			this._openCard();
		});
		//	помойка
		this._element.querySelector('.element__trash').addEventListener('click', () => {
			this._openDelCardPopup(this._element, this._id);
		});
		//	лайк
		this._likeButton.addEventListener('click', () => {
			if (this.isCardLikedByMe) {
				this._delLike(this._id)
					.then((res) => {
						this._removeLikeIcon();
						this._setLikeCnt(res.likes.length);
						this.isCardLikedByMe = false;
					})
			} else {

				this._addLike(this._id)
					.then((res) => {
						this._addLikeIcon();
						this.isCardLikedByMe = true;
						this._setLikeCnt(res.likes.length);
					})
			}
		});
	}
	
	_addLikeIcon() {
		this._likeButton.classList.add('like-container__like_enabled');
	}
	_removeLikeIcon() {
		this._likeButton.classList.remove('like-container__like_enabled');
	}
	
	_setLikeCnt(cnt) {
		this._element.querySelector('.like-container__count').textContent = cnt; 
	}
	
	generateCard() {
		this._element = this._getTemplate();
		this._likeButton = this._element.querySelector('.like-container__like');
		this._img = this._element.querySelector('.element__place');
		this._img.src = this._imageLink;
		this._img.alt = this._name;
		this._element.querySelector('.like-container__count').textContent = this._likes?.length ?? 0;
		this._element.querySelector('.element__caption').textContent = this._name;
		this._addListeners();
		if (this._userId === this._ownerId) {
			this._element.querySelector('.element__trash').classList.add('element__trash_show');
		}
		if (this.isCardLikedByMe) {
			this._addLikeIcon();
		}
		return this._element;
	}
}