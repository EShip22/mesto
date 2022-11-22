export class Section {
	constructor( {
		items,
		renderer
	}, containerSelector) {
		this._items = items;
		this._renderer = renderer;
		this._containerSelector = containerSelector;
	}
	
	renderAll() {
		this._items.forEach((item) => {
			this._renderer(item);
		});
	}
	
	addItem(card, isFirst = false) {
		const cardElems = document.querySelector(this._containerSelector);
		if (isFirst) {
			cardElems.prepend(card);
		} else {
			cardElems.append(card);
		}
	}
}