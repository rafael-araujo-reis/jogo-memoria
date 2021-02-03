const CARD_FRONT = `card-front`;
const CARD_BACK = `card-back`;
const BOARD = `board`;
const CLASS_CARD = `card`;
const CLASS_FLIP = `flip`;
const EXT_CARD = `?`;
const MKDIR = `./images/`;
const EXTENTION = `.png`;
const TIME_OUT = 1000;

startGame();

function startGame() {
    cards = game.createCards();
    printCards(cards);
}

function printCards(cards) {
    let board = document.getElementById(BOARD);
    board.innerHTML = ''
    game.count = 0;

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

function createCardContent(card, cardElement) {
    createCardFace(CARD_FRONT, card, cardElement);
    createCardFace(CARD_BACK, card, cardElement);
}

function createCardFace(face, card, element) {
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if (face === CARD_FRONT) {
        let iconElement = document.createElement('img');
        iconElement.src = MKDIR + card.img + EXTENTION;
        cardElementFace.appendChild(iconElement);
        cardElementFace.style.background = card.bg;
    } else {
        cardElementFace.innerHTML = EXT_CARD;
    }
    element.appendChild(cardElementFace);
}

function flipCard() {
    if (game.setCard(this.id)) {
        this.classList.add(CLASS_FLIP);

        if (game.secundCard) {
            if (game.checkMatch()) {
                game.exibirAcerto(true);
                game.pontuar();
                game.clearCards();
                if (game.checkGameOver()) {
                    game.vencedor();
                    let gameOver = document.getElementById('gameOver');
                    gameOver.style.display = 'flex';
                }
            } else {
                game.exibirInfo(true);
                setTimeout(() => {
                    let firstCardView = document.getElementById(game.firstCard.id);
                    let secundCardView = document.getElementById(game.secundCard.id);
                    firstCardView.classList.remove(CLASS_FLIP);
                    secundCardView.classList.remove(CLASS_FLIP);
                    game.unFlippedCards();
                }, TIME_OUT);
            }
        }
    }

}

function reset() {
    startGame();
    let gameOver = document.getElementById('gameOver');
    gameOver.style.display = 'none';
}