document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.memory-card');
    const timerDisplay = document.getElementById('timer');
    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let startTime;
    let timer;
    let matchesFound = 0;
    let totalFlips = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledCards = shuffle(Array.from(cards));
    shuffledCards.forEach(card => document.querySelector('.memory-game').appendChild(card));

    function startTimer() {
        startTime = new Date();
        timer = setInterval(() => {
            const elapsedTime = Math.floor((new Date() - startTime) / 1000);
            timerDisplay.textContent = `Time: ${elapsedTime}s`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function flipCard() {
        if (lockBoard) return; 
        if (this === firstCard) return; 

        this.classList.add('flip');
        totalFlips++;

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;

            if (matchesFound === 0 && totalFlips === 1) {
                startTimer();  
            }
        } else {
            hasFlippedCard = false;
            secondCard = this;

            checkForMatch();
        }

        if (totalFlips === cards.length) {
            stopTimer();  
        }
    }

    function checkForMatch() {
        let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

        if (isMatch) {
            disableCards();
            matchesFound += 1;
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
