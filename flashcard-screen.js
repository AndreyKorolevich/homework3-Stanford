// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;

    this.show = this.show.bind(this);
    this._showNewCard = this._showNewCard.bind(this);

     document.addEventListener('new-card', this._showNewCard);
  }

  show(flashcards) {
    this.containerElement.classList.remove('inactive');
    this.cards = Object.entries(flashcards);

    this._showNewCard();
    console.log(this.cards);
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _showNewCard() {
    const flashcardContainer = document.querySelector('#flashcard-container');
    console.log(this.cards);
    const card = new Flashcard(flashcardContainer, this.cards[0][0], this.cards[0][1]);
    this.cards.shift(0);
  }
}
