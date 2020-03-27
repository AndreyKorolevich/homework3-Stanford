class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.buttonMenu = document.querySelector('#results .to-menu');
    this.buttonMenu.addEventListener('click', this._openMenu);
  }

  show(deck) {
    this.containerElement.classList.remove('inactive');
    this.deck = Object.entries(deck[0]); //array all flashcards
    this.wrongCard = deck.slice(1, deck.length); //array wrong flashcards
    this.wrongAnswers = this.wrongCard.length;
    this.rightAnswers = this.deck.length - this.wrongAnswers;
    this.percent = Math.round(((this.deck.length - this.wrongAnswers) / this.deck.length) * 100);
    
    document.querySelector('#results .percent').textContent = this.percent;
    document.querySelector('#results .correct').textContent = this.rightAnswers;
    document.querySelector('#results .incorrect').textContent = this.wrongAnswers;

  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _openMenu(){
    document.querySelector('#results .percent').textContent = '';
    document.querySelector('#results .correct').textContent = '';
    document.querySelector('#results .incorrect').textContent = '';
    document.dispatchEvent(new CustomEvent('open-menu'));
  }
}
