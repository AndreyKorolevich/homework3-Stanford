class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.deck = [];
    this.show = this.show.bind(this);
    this._showNewCard = this._showNewCard.bind(this);

    document.addEventListener('new-card', this._showNewCard); // create new card when previous card swipe border 
  }

  show(flashcards) {
    this.containerElement.classList.remove('inactive');
    if (!Array.isArray(flashcards)) {
      this.cards = Object.entries(flashcards); // conversions object to array
    } else {
      this.cards = flashcards;
    }
    this._showNewCard();
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _showNewCard() {
    if (event.detail != null) {
      this.deck.push(event.detail) // This is array contain first position object start object from constants.js file and wrong answers
    }
    if (Array.isArray(this.deck[0])) {
      console.log(this.cards);
      this.deck.unshift(this.cards);
     
    }
    if (this.cards.length === 0) {
      document.querySelector('#main .status .correct').textContent = '0';
      document.querySelector('#main .status .incorrect').textContent = '0';
      document.dispatchEvent(new CustomEvent('show-results', {
        detail: this.deck
      })); // custom event for create result test
      this.deck = [];
      return;
    }
    const flashcardContainer = document.querySelector('#flashcard-container');
    new Flashcard(flashcardContainer, this.cards[0][0], this.cards[0][1]); // create first card from array 
    this.cards.shift(0); // delete first card from array
  }
}
