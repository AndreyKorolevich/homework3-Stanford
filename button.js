class Buttons {
    constructor(containerElement, title, words) {
        this.containerElement = containerElement;
        this.title = title;
        this.words = words;

        this._openItem = this._openItem.bind(this);

        this.item = document.createElement('div');
        this.item.textContent = this.title;
        this.item.addEventListener('click', this._openItem);
        this.containerElement.append(this.item);
    }

    _openItem(event) {
        document.dispatchEvent(new CustomEvent('item-opened', {detail: this.words} )); //custom event for create deck cards and broadcast corresponding object from constants
    }
}