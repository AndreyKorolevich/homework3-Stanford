class Flashcard {
  constructor(containerElement, frontText, backText) {

    this.originX = null;
    this.originY = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.cardStarted = false;
    this.containerElement = containerElement;
    this.rightAnswer = document.querySelector('#main .status .correct');
    this.wrongAnswer = document.querySelector('#main .status .incorrect');
    this.right = Number(this.rightAnswer.textContent);
    this.wrong = Number(this.wrongAnswer.textContent);
    this.card = [frontText, backText];
    
    this._flipCard = this._flipCard.bind(this);
    this._onCardStart = this._onCardStart.bind(this);
    this._onCardEnd = this._onCardEnd.bind(this);
    this._onCardMove = this._onCardMove.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);
    document.body.classList.remove('dark-background');

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

  _onCardStart(event) { // initialization starts coordinates
    this.originX = event.clientX;
    this.originY = event.clientY;
    this.cardStarted = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.transition = 'transform 0s';
  }

  _onCardMove(event) { // transform card during drag and drop
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
    if (deltaX > 149 || deltaX < -149) {
      document.body.classList.add('dark-background');
    } else {
      document.body.classList.remove('dark-background');
    }
  }


  _onCardEnd(event) {
    this.cardStarted = false;
    this.offsetX += event.clientX - this.originX;
    this.offsetY += event.clientY - this.originY;

    if (this.offsetX > 149) {
      this.right++;
      this.rightAnswer.textContent = `${this.right}`;
      this.containerElement.textContent = '';
      document.dispatchEvent(new CustomEvent('new-card')); // custom event for create new flashcard
    } else if (this.offsetX < -149) {
      const wrongCard = this.card; 
      this.wrong++;
      this.wrongAnswer.textContent = `${this.wrong}`;
      this.containerElement.textContent = '';
      
      document.dispatchEvent(new CustomEvent('new-card', {detail: wrongCard})); 
    } else {
      event.currentTarget.style.transition = 'transform 0.6s';
      event.currentTarget.style.transform = '';
      this.offsetX = 0;
      this.offsetY = 0;
    }
  }
}
