const CARD_FRONT = `card-front`;
const CARD_BACK = `card-back`;
var count = 0;

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
    'black',
    'tomato',
    'black',
    'tomato',
    'black',
    'tomato',
    'black',
    'tomato',
    'black',
    'tomato'
]

createCards(imgs);

function createCards(imgs){
    let cards = [];

    for(let img of imgs){
        cards.push(createPairCards(img));
    }

    console.log(cards.flatMap(pair => pair));

    document.getElementById
}

function createPairCards(img){
    return [
        {
            id: createIdCard(img),
            // bg: selectColorCard(cont),
            img: img,
            flipped: false
        },
        {
            id: createIdCard(img),
            // bg: selectColorCard(cont),
            img: img,
            flipped: false
        }
    ]
}

function createIdCard(img){
    return img + parseInt(Math.random() * 1000);
}

function selectColorCard(count){
    count++;
    color = colors[count];
    return color;
}