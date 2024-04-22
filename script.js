const buttons = document.querySelectorAll('.button');
const startButton = document.getElementById('startButton');
const sequence = [];
let userSequence = [];
let level = 0;
let started = false;

// Function to generate a random color and add it to the sequence
function nextSequence() {
    userSequence = [];
    level++;
    const randomNumber = Math.floor(Math.random() * 4);
    const randomColor = buttons[randomNumber];
    sequence.push(randomColor.id);
    playSequence();
}

// Function to play the sequence
function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        flashButton(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 1000);
}

// Function to flash a button
function flashButton(color) {
    const button = document.getElementById(color);
    button.classList.add('flash');
    setTimeout(() => {
        button.classList.remove('flash');
    }, 500);
}

// Function to check if user's sequence matches the game sequence
function checkSequence() {
    if (userSequence.length === sequence.length) {
        if (userSequence.join('') === sequence.join('')) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        } else {
            gameOver();
        }
    }
}

function handleClick(event) {
    if (started) {
        const color = event.target.id;
        flashButton(color);
        userSequence.push(color);
        checkSequence();
    }
}

function startGame() {
    if (!started) {
        started = true;
        startButton.disabled = true;
        nextSequence();
    }
}

function gameOver() {
    alert('Game Over! Your score: ' + level);
    sequence.length = 0;
    userSequence.length = 0;
    level = 0;
    started = false;
    startButton.disabled = false;
}

buttons.forEach((button) => {
    button.addEventListener('click', handleClick);
});

startButton.addEventListener('click', startGame);