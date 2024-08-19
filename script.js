
let num_of_cards = 0;
let score = 0;
let playerName = "";

window.addEventListener('load', function () {
    document.getElementById('game-setup').reset(); // Clears all input fields within the form
});

function numOfCards() {
    //Check for a valid input number of cards before starting the game

    num_of_cards = document.getElementById("cardPairs").value;

    if (num_of_cards % 2 != 0 || num_of_cards > 30 || num_of_cards < 4) {
        alert('Please enter the number as requested, refresh and try again');
        return -10;
    }

    return 0;
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('game-setup').addEventListener('submit', function (event) {
        event.preventDefault();

        if (numOfCards() == 0) {

            document.getElementById('game-setup').style.display = 'none';

            playerName = document.getElementById("playerName").value;

            const confirmationMessage = document.createElement('div');
            confirmationMessage.className = 'mt-4';
            confirmationMessage.innerHTML = `<h2>${playerName}, Let's Play!</h2>`;

            document.querySelector('.container').appendChild(confirmationMessage);

            generateCards(num_of_cards)
        }
    });
});

//Generate cards according to the number specified from the user
//--need to add images--
function generateCards(num_of_cards) {
    const $gameBoard = $('#memory-game-board');
    $gameBoard.empty();

    const numberOfPairs = num_of_cards / 2;
    const cards = [];
    for (let i = 0; i < numberOfPairs; i++) {
        const card1 = { id: i, matched: false };
        const card2 = { id: i, matched: false };
        cards.push(card1, card2);
    }

    cards.sort(() => Math.random() - 0.5);

    cards.forEach(card => {
        const $cardElement = $('<div>')
            .addClass('card')
            .attr('data-id', card.id)
            .text('?')
            .on('click', function () {
                flipCard($(this));
            });
        $gameBoard.append($cardElement);
    });
}

function flipCard($cardElement) {
    let firstCard = null;
    let secondCard = null;
    if ($cardElement.hasClass('flipped') || secondCard) return;

    $cardElement.addClass('flipped').text($cardElement.data('id'));

    if (!firstCard) {
        firstCard = $cardElement;
    } else {
        secondCard = $cardElement;
        checkMatch();
    }
}

//Need to write - score calc function, flip card when unmatched, vanish cards when matched