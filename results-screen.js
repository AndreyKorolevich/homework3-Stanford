class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.deck = [];
    this.buttonRestart = document.querySelector('#results .continue');
    this.buttonMenu = document.querySelector('#results .to-menu');

    this._restartDeck = this._restartDeck.bind(this);
    
    this.buttonMenu.addEventListener('click', this._openMenu);
  }

  show(deck) {
    this.containerElement.classList.remove('inactive');
    document.body.classList.remove('dark-background');
    
    this.deck = deck[0]; //object all flashcards
    this.amountCards = Object.keys(deck[0]).length;
    this.wrongCard = deck.slice(1, deck.length); //array wrong flashcards
    this.wrongAnswers = this.wrongCard.length;
    this.rightAnswers = this.amountCards - this.wrongAnswers;
    this.percent = Math.round(((this.amountCards - this.wrongAnswers) / this.amountCards) * 100);

    document.querySelector('#results .percent').textContent = this.percent;
    document.querySelector('#results .correct').textContent = this.rightAnswers;
    document.querySelector('#results .incorrect').textContent = this.wrongAnswers;

    if (this.percent === 100) {
      this.buttonRestart.textContent = 'Start over?';
      this.buttonRestart.addEventListener('click', this._restartDeck);      
    } else {
      this.buttonRestart.textContent = 'Continue';
    }

  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _openMenu() {
    document.querySelector('#results .percent').textContent = '';
    document.querySelector('#results .correct').textContent = '';
    document.querySelector('#results .incorrect').textContent = '';
    document.dispatchEvent(new CustomEvent('open-menu'));
  }

  _restartDeck() {
    document.dispatchEvent(new CustomEvent('restart-deck', {detail: this.deck}));
  }
}
