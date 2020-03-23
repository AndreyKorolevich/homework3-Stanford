// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

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




/*
class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.widgetElement = document.querySelector('#choices');
  
    this._openItem = this._openItem.bind(this);

    this.buttons = [];
    for(const source of FLASHCARD_DECKS) {
      new Buttons(source);
      
    }
    
    for(const source of FLASHCARD_DECKS){
    const item = document.createElement('div');
    item.textContent = source.title;
 
 
    item.addEventListener('click',this._openItem);
    this.widgetElement.append(item);
    }
    
  }

  show() {
    this.containerElement.classList.remove('inactive');
  }

  hide() {
    this.containerElement.classList.add('inactive');
  }

  _openItem(event) {
   // const item = event.currentTarget;
   // item.removeEventListener('click', this._openItem);
   document.dispatchEvent(new CustomEvent('item-opened', {detail: flashcards}));
  }
}*/