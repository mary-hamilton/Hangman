let randomWord = document.getElementById("random-word");
let userGuesses = document.getElementById("user-guess");
let usedLives = document.getElementById("used-lives");

function appendGuess () {
    userGuesses.appendChild(document.createElement('p'));
}

appendGuess();
appendGuess();
appendGuess();
