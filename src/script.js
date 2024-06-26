document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.memory-card');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Shuffle the NodeList of cards
    const shuffledCards = shuffle(Array.from(cards));
    shuffledCards.forEach(card => document.querySelector('.memory-game').appendChild(card));

    
    function flipCard() {
        if (lockBoard) return; 
        if (this === firstCard) return; 

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
        } else {
            hasFlippedCard = false;
            secondCard = this;

            checkForMatch();
        }
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

        if (isMatch) {
            disableCards();
        } else {
            lockBoard = true; 
            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                resetBoard();
            }, 1500); 
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
});
