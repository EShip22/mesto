export class UserInfo {
	constructor(userInfo) {
		this._profileInfoHeader = document.querySelector(userInfo.userNameSelector);//document.querySelector('.profile-info__header');
		this._profileInfoDescription = document.querySelector(userInfo.userActivitySelector);//document.querySelector('.profile-info__description');
		this._userAvatarSelector = userInfo.userAvatarSelector;
	}

	getUserInfo() {
    return {
      name: this._profileInfoHeader.textContent,
      description: this._profileInfoDescription.textContent,
    };
	}
	
	setUserInfo(userName, userActivity) {
		this._profileInfoHeader.textContent = userName;
		this._profileInfoDescription.textContent = userActivity;
	}
}