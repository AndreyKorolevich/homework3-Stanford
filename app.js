class App {
  constructor() {
    const menuElement = document.querySelector('#menu');
    this.menu = new MenuScreen(menuElement);

    const mainElement = document.querySelector('#main');
    this.flashcards = new FlashcardScreen(mainElement);

    const resultElement = document.querySelector('#results');
    this.results = new ResultsScreen(resultElement);

    this._showFlashcard = this._showFlashcard.bind(this);
    this._showResults = this._showResults.bind(this);
    this._showMenu = this._showMenu.bind(this);

    document.addEventListener('item-opened', this._showFlashcard); //custom event for create deck cards
    document.addEventListener('restart-deck', this._showFlashcard);
    document.addEventListener('show-results', this._showResults);
    document.addEventListener('open-menu', this._showMenu);
  }

  _showFlashcard (event) {
    this.results.hide();
    this.menu.hide();
    this.flashcards.show(event.detail); // event.detail is object with flashcards
  }

  _showResults() {
    this.flashcards.hide();
    this.results.show(event.detail);
  }

  _showMenu() {
    this.results.hide();
    this.menu.show();
  }
}
