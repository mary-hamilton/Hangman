let randomWord = document.getElementById("random-word");
let userGuesses = document.getElementById("user-guess");
let usedLives = document.getElementById("used-lives");
let button = document.getElementById("button");


function appendGuess (param) {
    let newLetter = document.createElement('span');
    newLetter.textContent = `${param}, `;
    userGuesses.appendChild(newLetter);
}

function lifeCounter() {
    let usedUp =  document.createElement('span');
    usedUp.textContent = "X";
    usedLives.appendChild(usedUp);
}
function getInput() {
    let userInput = document.getElementById("letter-input").value;
    appendGuess(userInput);
    lifeCounter();
}

button.onclick = getInput;

