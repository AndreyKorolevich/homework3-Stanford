class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.buttonContainer = document.querySelector('#choices');

    for(const source of FLASHCARD_DECKS) { 
      new Buttons(this.buttonContainer, source.title, source.words); //create item menu  
    }  
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
