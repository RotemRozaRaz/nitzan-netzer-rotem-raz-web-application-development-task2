//<!--nitzan_netzer_207153479_rotem_raz_207950973-->

let num_of_pairs = 0;
let player_name = "";
let cards = [];
let flipped_cards = [];
let score = 0;


document.getElementById('game-setup').addEventListener('submit', function(event) {
    event.preventDefault();
    startGame();
});

document.getElementById('reset').addEventListener('click', function() {
    resetGame();
});

function startGame() {
    player_name = document.getElementById("playerName").value;
    num_of_pairs = parseInt(document.getElementById("cardPairs").value);
    temp = document.getElementById('lets-play');
    temp.innerHTML = player_name+", Let's Play!";
    if (!check_num_of_pairs(num_of_pairs)) return;

    newGame();

    document.getElementById('game-setup').style.display = 'none';
    document.getElementById('game-info').style.display = 'flex';
}

function check_num_of_pairs(num_of_pairs) {
    if (isNaN(num_of_pairs)) {
        alert('You must enter a number.');
        return false;
    }
    if (num_of_pairs < 2 || num_of_pairs > 30) {
        alert('Number must be between 2 and 30.');
        return false;
    }
    return true;
}

function newGame() {
    cards = generateCards(num_of_pairs);
    createGameBoard(cards);
    startTime = new Date();
    startTimer();
}

function resetGame() {
    flipped_cards = [];
    score = 0;
    update_score();
    const memoryGame = document.getElementById('memory-game');
    memoryGame.innerHTML = '';
    newGame();
}

function generateCards(num_of_pairs) {
    cards = [];
    for (let i = 1; i <= num_of_pairs; i++) {
        cards.push(i);
        cards.push(i);
    }
    shuffle(cards);
    return cards;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGameBoard(cards) {
    const memoryGame = document.getElementById('memory-game');
    memoryGame.className = 'row';
    
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card', 'col-6', 'col-sm-4', 'col-md-3', 'col-lg-2', 'col-xl-2');
        cardElement.dataset.value = card;

        const cardFront = document.createElement('img');
        cardFront.src = `images/${card}.png`;  
        cardElement.appendChild(cardFront);

        const cardBack = document.createElement('img');
        cardBack.src = `images/card_back.jpg`; 
        cardBack.classList.add('card-back');
        cardElement.appendChild(cardBack);

        cardElement.addEventListener('click', flipCard);
        memoryGame.appendChild(cardElement);
    });
}

function flipCard() {
    if (flipped_cards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flipped_cards.push(this);
        
        if (flipped_cards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [firstCard, secondCard] = flipped_cards;
    
    if (firstCard.dataset.value === secondCard.dataset.value) {
        score++;
        update_score();
        flipped_cards = [];
        if (score === num_of_pairs) {
            endGame();
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            flipped_cards = [];
        }, 1000);
    }
}

function endGame() {
    clearInterval(timer);
    alert(`Well done: ${document.getElementById('timer').textContent}`);
}

function startTimer() {
    timer = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
        const seconds = String(elapsedTime % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `Time: ${minutes}:${seconds}`;
    }, 1000);
}

function update_score()
{
    document.getElementById("score").innerHTML="score="+score
}