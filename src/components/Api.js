class Api {
  constructor(options) {
		this._baseUrl = options.baseUrl;
		this._usersUrl = `${this._baseUrl}/users/me`;
		this._cardUrl = `${this._baseUrl}/cards`;
		this._authToken = options.headers.authorization
  }
	
	_getResponseData(res) {
			if (!res.ok) {
					return Promise.reject(`Ошибка: ${res.status}`); 
			}
			return res.json();
	} 

	getInitialCards() {
		return fetch(this._cardUrl, {
			headers: {
				authorization: this._authToken
			}
		})
			.then(res => {
				return this._getResponseData(res);
			})
	}
	
	addCard(cardName, cardLink) {
		return fetch(api._cardUrl, {
			method: 'POST',
			headers: {
				authorization: api._authToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: cardName,
				link: cardLink
			})
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}
	
	delCardQuery(id) {
		return fetch(`${api._cardUrl}/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: api._authToken,
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				return api._getResponseData(res);
			});
	}
	
	getUserInfo() {
		return fetch(this._usersUrl, {
			headers: {
				authorization: this._authToken,
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}

	setUserInfo(formValues) {
		return fetch(this._usersUrl, {
			method: 'PATCH',
			headers: {
				authorization: this._authToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: formValues.name,
				about: formValues.description
			})
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}
	
	addLike(cardId) {
		return fetch(`${api._cardUrl}/${cardId}/likes`, {
			method: 'PUT',
			headers : {
				authorization: api._authToken,
				'Content-Type': 'application/json'
			}
		})
			.then((res) => {
				return this._getResponseData(res);
			});
	}
	
	delLike(cardId) {
		return fetch(`${api._cardUrl}/${cardId}/likes`, {
			method: 'DELETE',
			headers : {
				authorization: api._authToken,
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}
	
	setUserAvatar(urlAvatar) {
		return fetch(`${api._usersUrl}/avatar`, {
			method: 'PATCH',
			headers : {
				authorization: api._authToken,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				avatar: urlAvatar
			})
		})
			.then(res => {
				return this._getResponseData(res);
			});
	}
	
}

export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
	headers: {
		authorization: 'ddf428a7-16b6-4724-b90f-7c16ff158dcf',
		'Content-Type': 'application/json'
	}
});