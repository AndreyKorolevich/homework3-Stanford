class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.deck = [];
    this.buttonRestart = document.querySelector('#results .continue');
    this.buttonMenu = document.querySelector('#results .to-menu');

    this._restartDeck = this._restartDeck.bind(this);
    this._continueDeck = this._continueDeck.bind(this);
    this._openMenu = this._openMenu.bind(this);
    
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
      this.buttonRestart.removeEventListener('click', this._continueDeck);     
    } else {
      this.buttonRestart.textContent = 'Continue';
      this.continueDeck = deck;
      this.buttonRestart.removeEventListener('click', this._restartDeck);  
      this.buttonRestart.addEventListener('click', this._continueDeck);
    }

  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _zeroingContent(){
    document.querySelector('#results .percent').textContent = '';
    document.querySelector('#results .correct').textContent = '';
    document.querySelector('#results .incorrect').textContent = '';
  }

  _openMenu() {
    this._zeroingContent();
    document.dispatchEvent(new CustomEvent('open-menu'));
  }

  _restartDeck() {
    this._zeroingContent();
    document.dispatchEvent(new CustomEvent('restart-deck', {detail: this.deck}));
  }

  _continueDeck() {
    this._zeroingContent();
    document.querySelector('#main .status .correct').textContent = this.rightAnswers;
    document.dispatchEvent(new CustomEvent('continue-deck', {detail: this.continueDeck}));
  }
}
