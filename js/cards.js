const CARD_FRONT = `card-front`;
const CARD_BACK = `card-back`;
const BOARD = `board`;
const CLASS_CARD = `card`;
const EXT_CARD = `?`;
const MKDIR = `./images/`;
const EXTENTION = `.png`;
const ICON = `icon`;

let count = 0;

let cards = null;

let imgs = [
    'alegria',
    'chaves',
    'chiquinha',
    'dory',
    'elastica',
    'incrivel',
    'kiko',
    'madruga',
    'mickey',
    'nemo'
];

let colors = [
    'ff6347',
    '#81ecec',
    '#a29bfe',
    '#dfe6e9',
    '#55efc4',
    '#0984e3',
    '#fd79a8',
    '#fab1a0',
    
    '#badc58',
    '#030101'
]

startGame();

function startGame(){
    cards = createCards(imgs);
    shuffleCards(cards);
    printCards(cards);
}

function createCards(imgs){
    let cards = [];

    for(let img of imgs){
        cards.push(createPairCards(img));
        count++;
    }
    cards = cards.flatMap(pair => pair);
    return cards;
}

function shuffleCards(cards){
    let currentIndex = cards.length;
    let randonIndex = 0;

    while(currentIndex !== 0){
        randonIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [cards[randonIndex], cards[currentIndex]] = [cards[currentIndex], cards[randonIndex]];
    }
}

function createPairCards(img){
    return [
        {
            id: createIdCard(img),
            bg: selectColorCard(count),
            img: img,
            flipped: false
        },
        {
            id: createIdCard(img),
            bg: selectColorCard(count),
            img: img,
            flipped: false
        }
    ]
}

function createIdCard(img){
    return img + parseInt(Math.random() * Math.PI);
}

function selectColorCard(){
    color = colors[count];    
    return color;
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