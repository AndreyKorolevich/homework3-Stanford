class Buttons {
    constructor(containerElement, title, words) {
        this.containerElement = containerElement;
        this.title = title;
        this.words = words;

        this._openItem = this._openItem.bind(this);

        const item = document.createElement('div');
        item.textContent = this.title;
        item.addEventListener('click', this._openItem);
        this.containerElement.append(item);
    }



    _openItem(event) {
        const flashcards = this.words;
        //const item = event.currentTarget;
        //item.removeEventListener('click', this._openItem);
        console.log(flashcards);
        document.dispatchEvent(new CustomEvent('item-opened' , {detail: flashcards} ));
    }
}