export class UserInfo {
	constructor(userInfo) {
		this._formUserName = document.querySelector(userInfo.userNameSelector).textContent;
		this._formUserActivity = document.querySelector(userInfo.userActivitySelector).textContent;
		this._popupUserName = document.querySelector('.popup__input_field_name').value;
		this._popupUserActivity = document.querySelector('.popup__input_field_activity-category').value;
	}

	getUserInfo() {
		return {
			userName: this._formUserName,
			userActivity: this._formUserActivity
		};
	}
	
	fillInputsPopupUserInfo(userInfoFill) {
		document.querySelector('.popup__input_field_name').value = userInfoFill.userName;
		document.querySelector('.popup__input_field_activity-category').value = userInfoFill.userActivity;
	}
	
	setUserInfo() {
		const userName = document.querySelector('.profile-info__header');
		const userJob = document.querySelector('.profile-info__description');
		userName.textContent = document.querySelector('.popup__input_field_name').value;
		userJob.textContent = document.querySelector('.popup__input_field_activity-category').value;
		this._formUserName = document.querySelector('.popup__input_field_name').value;
		this._formUserActivity = document.querySelector('.popup__input_field_activity-category').value;
	}
}