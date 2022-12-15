export class Section {
	constructor(renderer, containerSelector) {
		this._renderer = renderer;
		this._cardElems = document.querySelector(containerSelector);
	}
	
	renderAll(items) {
		items.forEach((item) => {
			this._renderer(item);
		});
	}
	
	addItem(card, isFirst = false) {
		if (isFirst) {
			this._cardElems.prepend(card);
		} else {
			this._cardElems.append(card);
		}
	}
}