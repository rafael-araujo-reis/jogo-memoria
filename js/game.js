let game = {
    count: 0,
    cards: null,

    imgs: [
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
    ],

    colors: [
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
    ],

    createCards: function () {
        this.cards = [];

        for (let img of this.imgs) {
            this.cards.push(this.createPairCards(img));
            this.count++;
        }
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairCards: function (img) {
        return [
            {
                id: this.createIdCard(img),
                bg: this.selectColorCard(),
                img: img,
                flipped: false
            },
            {
                id: this.createIdCard(img),
                bg: this.selectColorCard(),
                img: img,
                flipped: false
            }
        ]
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randonIndex = 0;

        while (currentIndex !== 0) {
            randonIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randonIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randonIndex]];
        }
    },

    createIdCard: function (img) {
        return img + parseInt(Math.random() * Math.PI);
    },

    selectColorCard: function () {
        color = this.colors[this.count];
        return color;
    }

}