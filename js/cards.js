const CARD_FRONT = `card-front`;
const CARD_BACK = `card-back`;
const BOARD = `board`;
const CLASS_CARD = `card`;
const EXT_CARD = `?`;
const MKDIR = `./images/`;
const EXTENTION = `.png`;
const ICON = `icon`;

startGame();

function startGame(){
    cards = game.createCards();
    printCards(cards);
}

function printCards(cards){
    let board = document.getElementById(BOARD);
    cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CLASS_CARD);
        cardElement.dataset.img = card.img;
        cardElement.addEventListener('click', flipCard);
        createCardContent(card, cardElement);
        board.appendChild(cardElement);
    });
}

function createCardContent(card, cardElement){
    createCardFace(CARD_FRONT, card, cardElement);
    createCardFace(CARD_BACK, card, cardElement);
}

function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === CARD_FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = MKDIR + card.img + EXTENTION;
        cardElementFace.appendChild(iconElement);
        cardElementFace.style.background = card.bg;
    }else{
        cardElementFace.innerHTML = EXT_CARD;
    }
    element.appendChild(cardElementFace);
}

function flipCard(){
    this.classList.add('flip');
}