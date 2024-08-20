let num_of_pairs = 0;
let player_name = "";
let cards = [];
let flipped_cards = [];
let score = 0;


document.getElementById('game-setup').addEventListener('submit', function(event) {
    event.preventDefault();
    startGame();
});

function startGame() {
    player_name = document.getElementById("playerName").value;
    num_of_pairs = parseInt(document.getElementById("cardPairs").value);

    if (!check_num_of_pairs(num_of_pairs)) return;

    newGame();

    document.getElementById('game-setup').style.display = 'none';
    document.getElementById('memory-game').style.display = 'grid';

}

function check_num_of_pairs(num_of_pairs) {
    if (isNaN(num_of_pairs)) {
        alert('You must enter a number.');
        return false;
    }
    if (num_of_pairs < 2 || num_of_pairs > 15) {
        alert('Number must be an even number between 2 and 15.');
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

    
    // Calculate the number of rows and columns dynamically
    let numColumns = Math.floor(Math.sqrt(cards.length));
    while (cards.length % numColumns !== 0) {
        numColumns--;
    }
    const numRows = cards.length / numColumns;
    
    memoryGame.style.gridTemplateColumns = `repeat(${numColumns}, 1fr)`; 
    memoryGame.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;  
    
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('memory-card');
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
    const timerElement = document.createElement('div');
    timerElement.id = 'timer';
    timerElement.textContent = 'time: 00:00';
    memoryGame.appendChild(timerElement);

    const scoreElement = document.createElement('div');
    scoreElement.id = 'score';
    scoreElement.textContent = 'score= 0';
    memoryGame.appendChild(scoreElement);

    const resetButton = document.createElement('button');
    resetButton.id = 'reset';
    resetButton.type = 'button';
    resetButton.className = 'btn btn-secondary';
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', resetGame);
    memoryGame.appendChild(resetButton);

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
        document.getElementById("score").innerHTML="score= "+score
        flipped_cards = [];
        if (score === cards  / 2) {
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
    alert(`well done: ${document.getElementById('timer').textContent}`);
}

function startTimer() {
    timer = setInterval(() => {
        const elapsedTime = Math.floor((new Date() - startTime) / 1000);
        const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
        const seconds = String(elapsedTime % 60).padStart(2, '0');
        document.getElementById('timer').textContent = `time: ${minutes}:${seconds}`;
    }, 1000);
}
