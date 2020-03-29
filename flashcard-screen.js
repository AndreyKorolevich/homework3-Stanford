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
      this.cards = flashcards.slice(1, flashcards.length); //when user click 'continue' array come in 'show' that contain first position object start deck and last position wrong answer
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
    if (this.cards.length === 0) {
      if (Array.isArray(this.deck[0])) { //this is a reduction to the required form
        const cardDeck = this.deck[0][0];
        this.deck[0] = cardDeck;
      }
      document.querySelector('#main .status .correct').textContent = '0';
      document.querySelector('#main .status .incorrect').textContent = '0';
      console.log(this.deck);
      document.dispatchEvent(new CustomEvent('show-results', {
        detail: this.deck
      })); // custom event for create result test
      this.deck = []; //zeroing array
      return;
    }
    const flashcardContainer = document.querySelector('#flashcard-container');
    new Flashcard(flashcardContainer, this.cards[0][0], this.cards[0][1]); // create first card from array 
    this.cards.shift(0); // delete first card from array
  }
}
