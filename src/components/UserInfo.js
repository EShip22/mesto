export class UserInfo {
	constructor(userInfo) {
		this._profileInfoHeader = document.querySelector(userInfo.userNameSelector);
		this._profileInfoDescription = document.querySelector(userInfo.userActivitySelector);
		this.avatar = document.querySelector(userInfo.userAvatarSelector);
	}

	getUserInfo() {
    return {
      name: this._profileInfoHeader.textContent,
      description: this._profileInfoDescription.textContent,
    };
	}
	
	setUserInfo(userName, userActivity, avatar) {
		this._profileInfoHeader.textContent = userName;
		this._profileInfoDescription.textContent = userActivity;
		this.avatar.src = avatar;
		this.avatar.alt = userName;
	}
}