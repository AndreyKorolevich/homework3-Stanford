// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.buttonContainer = document.querySelector('#choices');

    for(const source of FLASHCARD_DECKS) {
      new Buttons(this.buttonContainer, source.title, source.words);     
    }  
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }
}
