export class UserInfo {
	constructor(userInfo) {
		this._formUserName = document.querySelector(userInfo.userNameSelector).textContent;
		this._formUserActivity = document.querySelector(userInfo.userActivitySelector).textContent;
	}

	getUserInfo() {
		return {
			userName: this._formUserName,
			userActivity: this._formUserActivity
		};
	}
	
	setUserInfo(userName, userActivity) {
		this._formUserName = userName;
		this._formUserActivity = userActivity;
		document.querySelector('.profile-info__header').textContent = this._formUserName;
		document.querySelector('.profile-info__description').textContent = this._formUserActivity;
	}
}