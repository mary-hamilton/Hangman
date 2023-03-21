let word = document.getElementById("random-word");
let userGuesses = document.getElementById("user-guess");
let usedLives = document.getElementById("used-lives");
let startButton = document.getElementById("submit-button");
let resetButton = document.getElementById("reset-button")
let alertArea = document.getElementById("alert-area")

let livesLeft = 10;
let randomWord = "";
let splitRandomWord = [];
let guessedLetters = [];
let correctGuesses = [];
let badGuesses = [];
let userInput;
//TEST CODE FOR PUSHING

// Getting everything set up

// function for picking random word (out of 2605)
function randomWordGenerator() {
    let randomNumber = Math.floor(Math.random() * words.length);
    randomWord = words[randomNumber];
}

// call the random word function on page load

randomWordGenerator();

// function to split word into array so visibility of each element can be controlled

function splitWord() {
    splitRandomWord = randomWord.split("");
    console.log(splitRandomWord)
}
//  calling splitWord on page load

splitWord();


// function to make splitRandomWord into html elements

function makeLetterElements() {

    for (let i = 0; i < splitRandomWord.length; i++) {
        let wordLetter = document.createElement('span');
        wordLetter.textContent = "_"
        wordLetter.className = "word-letter";
        wordLetter.style.margin = '5px';
        word.appendChild(wordLetter);
    }
}

// calling makeLetterElements;

makeLetterElements();

// Playing the game


// Getting user guess, checking it's a letter, converting to lowercase, checking it hasn't been guessed before,
// clearing input field after use
function startGame() {
    
    userInput = document.getElementById("letter-input").value;
    
    if (!/^[A-Za-z]+$/.test(userInput)) {
        alertArea.textContent = "That is not a valid guess! Try again";
    } else {
        userInput = userInput.toLowerCase();
        if (duplicate(userInput)) {
            alertArea.textContent = "You have already guessed that letter!";
        } else {
            guessedLetters.push(userInput);
            checkGuess(userInput);
            
        }
    }
    document.getElementById("letter-input").value = "";
    victory();
    if(!livesLeft) {
        alertArea.textContent = "You lost! Click reset to play again";
    }
    
}
// call startGame on button click

startButton.onclick = startGame;

// function to stop the same guess twice

function duplicate(letter) {
    let flag = false;
    for (let i = 0; i < guessedLetters.length; i++) {
        if (letter === guessedLetters[i]) {
            flag = true;
        }
    }
    return flag;
}


// function to check if guess is in word 
function checkGuess(letter) {
    let flag = false
    for (let i = 0; i < splitRandomWord.length; i++) {
        if (letter === splitRandomWord[i]) {
            flag = true;
            document.getElementsByClassName("word-letter")[i].textContent = letter;
        } 
        
    }
    if (flag === false ){
        badGuesses.push(letter);
        appendBadGuess(letter);
    } else {
        correctGuesses.push(letter);
    }
}

// append bad guess and decrease lives
function appendBadGuess(letter) {

    let badGuess = document.createElement('span');
    badGuess.className = "bad-guess";
    badGuess.textContent = `${letter}, `;
    userGuesses.appendChild(badGuess);
    lifeCounter();
}


// function to decrease lives
function lifeCounter() {
    let life = usedLives.getElementsByClassName("life")[0];
    usedLives.removeChild(life);
    livesLeft --;
    
}

// function to check if you've won

function victory() {
    let sortedRandomWord = splitRandomWord.filter((item, index) => splitRandomWord.indexOf(item) === index).sort();
    let sortedCorrectGuesses = correctGuesses.sort();
   if (sortedCorrectGuesses.toString() === sortedRandomWord.toString()) {
       alertArea.textContent = "VICTORY!!! Click reset to play again";
       
       
   }
}


// function to end and reset 

function reset() {

    livesLeft = 10;
    word.replaceChildren();
    userGuesses.replaceChildren();
    for  (let i = 0; i < livesLeft; i++) {
        let life = document.createElement('span');
        life.textContent = "X";
        life.className = "life";
        usedLives.appendChild(life);
    }
   
    
    alertArea.textContent = "";
    randomWordGenerator();
    splitWord();
    makeLetterElements();
}

resetButton.onclick = reset;






