class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.deck = [];
    this.show = this.show.bind(this);
    this._showNewCard = this._showNewCard.bind(this);
    this._showWrongCard = this._showWrongCard.bind(this);

    document.addEventListener('new-card', this._showNewCard); // create new card when previous card swipe border 
  }

  show(flashcards) {
    this.containerElement.classList.remove('inactive');
    this.cards = Object.entries(flashcards); // conversions object to array

    this._showNewCard();
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _showNewCard() {
    if (event.detail != null) {
      this.deck.push(event.detail) // This is array contain first position object start object from constants.js file and wrong answers
    }
    if (this.cards.length === 0) {
      document.dispatchEvent(new CustomEvent('show-results', {detail: this.deck})); // custom event for create result test
      return;
    }
    const flashcardContainer = document.querySelector('#flashcard-container');
    new Flashcard(flashcardContainer, this.cards[0][0], this.cards[0][1]); // create first card from array 
    this.cards.shift(0); // delete first card from array
  }

  _showWrongCard(event) {
    this.wrongCards.push(event.detail);
  }
}
