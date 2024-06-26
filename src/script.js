// script.js

document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.memory-card');

    function flipCard() {
        console.log("Flipped");
        this.classList.toggle('flip');
    }

    cards.forEach(card => card.addEventListener('click', flipCard));
});

