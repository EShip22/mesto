export class UserInfo {
	constructor(userInfo) {
		this._formUserName = document.querySelector(userInfo.userNameSelector);
		this._formUserActivity = document.querySelector(userInfo.userActivitySelector);
		this._profileInfoHeader = document.querySelector('.profile-info__header');
		this._profileInfoDescription = document.querySelector('.profile-info__description');
	}

	getUserInfo() {
		const inputValues = [
			{value: this._formUserName.textContent, inputName: 'fieldName'},
			{value: this._formUserActivity.textContent, inputName: 'fieldActivityCategory'}
		];

		return inputValues;
	}
	
	setUserInfo(userName, userActivity) {
		this._profileInfoHeader.textContent = userName;
		this._profileInfoDescription.textContent = userActivity;
	}
}