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
    // let usedUp =  document.createElement('span');
    // usedUp.textContent = "X";
    usedLives.removeChild(usedLives.lastElementChild);
}
function getInput() {
    let userInput = document.getElementById("letter-input").value;
    if (userInput.length === 1) {
        appendGuess(userInput);
        // need to change this so lifeCounter doesn't increase if guess is correct
        lifeCounter();
    } else {
        alert("that is not a valid guess! Try again")
    }
}
    


button.onclick = getInput;

