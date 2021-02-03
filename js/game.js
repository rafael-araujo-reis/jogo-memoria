let game = {
    count: 0,
    cards: null,
    lockMode: false,
    firstCard: null,
    secundCard: null,

    jogador1: null,
    jogador2: null,
    pontosj1: 1,
    pontosj2: 1,
    jogador: 1,

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
        'nemo',
        'gato',
        'largatixo',
        'corugita',
        'pjmasks'
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
        '#030101',
        '#ffffff',
        '#a55a9f',
        '#ffd014',
        '#14ffd4'
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
        return img + parseInt(Math.random() * (Math.PI * 1500));
    },

    selectColorCard: function () {
        color = this.colors[this.count];
        return color;
    },

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];
        game.exibirAcerto(false);
        game.exibirInfo(false);

        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
        } else {
            this.secundCard = card;
            this.secundCard.flipped = true;
            this.lockMode = true;
        }

        return true;
    },

    unFlippedCards: function () {
        this.firstCard.flipped = false;
        this.secundCard.flipped = false;
        this.clearCards();
    },

    checkMatch: function () {
        if (!this.firstCard || !this.secundCard) {
            return false;
        }
        return this.firstCard.img === this.secundCard.img;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secundCard = null;
        this.lockMode = false;
        game.jogadorVez();
    },

    checkGameOver: function () {
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    exibirAcerto: function (boolean) {
        var box = document.getElementById('box-sucess');
        if (boolean) {
            box.style.display = 'flex';
        } else {
            box.style.display = 'none';
        }
    },

    exibirInfo: function (boolean) {
        var box = document.getElementById('box-info');
        if (boolean) {
            box.style.display = 'flex';
        } else {
            box.style.display = 'none';
        }
    },

    jogadorVez: function () {
        jogadorVez = document.getElementById('jogadorVez');
        if (this.jogador == 1) {
            jogadorVez.innerHTML = this.jogador2
            this.jogador = 2;
        } else {
            jogadorVez.innerHTML = this.jogador1
            this.jogador = 1;
        }
    },

    pontuar: function () {
        if (this.jogador == 1) {
            document.getElementById('ptos1').innerHTML = this.pontosj1++;
        } else {
            document.getElementById('ptos2').innerHTML = this.pontosj2++;
        }
    },
    vencedor: function () {
        frase = null;
        if (this.pontosj1 > this.pontosj2) {
            frase = 'Parabéns ' + this.jogador1 + ', você venceu!'
        } else if (this.pontosj1 < this.pontosj2) {
            frase = 'Parabéns ' + this.jogador2 + ', você venceu!'
        } else {
            frase = 'Deu empate, ninguém ganhou!';
        }

        document.getElementById('vencedor').innerHTML = frase;
    }
}