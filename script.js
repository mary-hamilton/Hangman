let word = document.getElementById("random-word");
let userGuesses = document.getElementById("user-guess");
let usedLives = document.getElementById("used-lives");
let button = document.getElementById("button");


function appendGuess (param) {
    // need to add a function checking if the guess is correct or not
    let newLetter = document.createElement('span');
    newLetter.textContent = `${param}, `;
    userGuesses.appendChild(newLetter);
}

function lifeCounter() {
    let life = usedLives.getElementsByClassName("life")[0];
    // need to add a function checking if the guess is correct or not
    usedLives.removeChild(life);
}

// Getting user guess
function getInput() {
    let userInput = document.getElementById("letter-input").value;
    if (userInput.length === 1) {
        appendGuess(userInput);
        // need to change this so lifeCounter doesn't increase if guess is correct
        lifeCounter();
    } else {
        // do something better than alert!
        alert("that is not a valid guess! Try again")
    }
}

button.onclick = getInput;

// function for picking random word (out of 2605)
function randomWord() {

    let randomNumber = Math.floor(Math.random() * 2605);
    word.innerText = words[randomNumber - 1];
}

// call the random word function on page load

randomWord();





