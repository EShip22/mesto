class Api {
  constructor(options) {
		this._baseUrl = options.baseUrl;
		this._usersUrl = `${this._baseUrl}/users/me`;
		this._cardUrl = `${this._baseUrl}/cards`;
		this._authToken = options.headers.authorization
  }

	getInitialCards() {
		return fetch(this._cardUrl, {
			headers: {
				authorization: this._authToken
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch((err) => console.log(err));
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
		}).then (res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch((err) => console.log(err));
	}
	
	delCard(id) {
		return fetch(`${api._cardUrl}/${id}`, {
			method: 'DELETE',
			headers: {
				authorization: api._authToken,
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch((err) => console.log(err));
	}
	


	getUserInfo() {
		return fetch(this._usersUrl, {
			headers: {
				authorization: this._authToken,
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch((err) => console.log(err));
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
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch((err) => console.log(err));
	}
	
	addLike(cardId) {
		return fetch(`${api._cardUrl}/${cardId}/likes`, {
			method: 'PUT',
			headers : {
				authorization: api._authToken,
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch((err) => console.log(err));
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
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch((err) => console.log(err));
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
				if (res.ok) {
					return res.json();
				}
				return Promise.reject(`Ошибка: ${res.status}`);
			})
			.catch((err) => console.log(err));
	}
	
}

export const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-54',
	headers: {
		authorization: 'ddf428a7-16b6-4724-b90f-7c16ff158dcf',
		'Content-Type': 'application/json'
	}
});