let word = document.getElementById("random-word");
let userGuesses = document.getElementById("user-guess");
let usedLives = document.getElementById("used-lives");
let button = document.getElementById("submit-button");

let livesLeft = 10;
let randomWord = "";
let splitRandomWord = [];
let guessedLetters = [];
let correctGuesses = [];
let badGuesses = [];
let userInput;


// Getting everything set up

// function for picking random word (out of 2605)
function randomWordGenerator() {
    let randomNumber = Math.floor(Math.random() * 2605);
    randomWord = words[randomNumber - 1];
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


// Getting user guess, checking it's only one letter and converting to lowercase
function getInput() {
    userInput = document.getElementById("letter-input").value;
    if (/^[A-Za-z]+$/.test(userInput)) {
        userInput = userInput.toLowerCase();
        guessedLetters.push(userInput);
        checkGuess(userInput);
    } else {
        // do something better than alert!
        alert("that is not a valid guess! Try again")
    }
}
// call getInput on button click

button.onclick = getInput;



// function to check if guess is in word 
function checkGuess(letter) {
    let flag = false
    for (let i = 0; i < splitRandomWord.length; i++) {
        console.log(splitRandomWord[i]);
        if (letter === splitRandomWord[i]) {
            flag = true;
            document.getElementsByClassName("word-letter")[i].textContent = letter;
        } 
        
    }
    if (flag === false ){
        badGuesses.push(letter);
        console.log(badGuesses);
        appendBadGuess(letter);
    }
}

// append bad guess and decrease lives
function appendBadGuess(letter) {

    let badGuess = document.createElement('span');
    badGuess.className = "bad-guess";
    badGuess.textContent = `${letter}, `;
    console.log(badGuesses.indexOf(letter));
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

// function victory() {
//    if (correctGuesses.sort() === splitRandomWord.sort()) {
//        console.log("VICTORY");
//    }
// }









