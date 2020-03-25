// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class Flashcard {
  constructor(containerElement, frontText, backText) {

    this.originX = null;
    this.originY = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.cardStarted = false;
    this.containerElement = containerElement;

    this._flipCard = this._flipCard.bind(this);
    this._onCardStart = this._onCardStart.bind(this);
    this._onCardEnd = this._onCardEnd.bind(this);
    this._onCardMove = this._onCardMove.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener('pointerup', this._flipCard);
    this.flashcardElement.addEventListener('pointerdown', this._onCardStart);
    this.flashcardElement.addEventListener('pointerup', this._onCardEnd);
    this.flashcardElement.addEventListener('pointermove', this._onCardMove);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('flashcard-box');
    cardContainer.classList.add('show-word');

    const wordSide = document.createElement('div');
    wordSide.classList.add('flashcard');
    wordSide.classList.add('word');
    wordSide.textContent = frontText;

    const definitionSide = document.createElement('div');
    definitionSide.classList.add('flashcard');
    definitionSide.classList.add('definition');
    definitionSide.textContent = backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle('show-word');
  }

  _onCardStart(event) {
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.cardStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.transition = 'transform 0s';
  }

  _onCardMove(event) {
    if (!this.cardStarted) {
      return;
    }
    event.preventDefault();
    const deltaX = event.clientX - this.originX;
    const deltaY = event.clientY - this.originY;
    const translateX = this.offsetX + deltaX;
    const translateY = this.offsetY + deltaY;
    event.currentTarget.style.transform = 'translate(' +
      translateX + 'px, ' + translateY + 'px)' + 'rotate(' + 0.2 * deltaX + 'deg)';
    if (this.deltaX > 149 || this.deltaX < -149) {
      document.body.classList.add('darkBackground');
    } else {
      document.body.classList.remove('darkBackground');
    }
  }


  _onCardEnd(event) {
    this.cardStarted = false;
    this.offsetX += event.clientX - this.originX;
    this.offsetY += event.clientY - this.originY;
    if (this.offsetX < 149 && this.offsetX > -149) {
      event.currentTarget.style.transition = 'transform 0.6s';
      event.currentTarget.style.transform = '';
      this.offsetX = 0;
      this.offsetY = 0;
    }
  }
}
