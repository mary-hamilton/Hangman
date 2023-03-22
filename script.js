let word = document.getElementById("random-word");
let userGuesses = document.getElementById("user-guess");
let usedLives = document.getElementById("used-lives");
let startButton = document.getElementById("start-button");
let resetButton = document.getElementById("reset-button")
let alertArea = document.getElementById("alert-area")

let livesLeft;
let randomWord = "";
let splitRandomWord = [];
let guessedLetters = [];
let correctGuesses = [];
let badGuesses = [];
let userInput;


// Calling reset on page load to begin the game

reset();

// Getting everything set up

// function for picking random word (out of 2605)
function randomWordGenerator() {
    let randomNumber = Math.floor(Math.random() * words.length);
    randomWord = words[randomNumber];
}

// // function to select random words that include cat
// function catRandomWords () {
//     let catRandomWord = words.filter(a => a.includes("cat") || a.includes("kit"));
//     console.log(catRandomWord);
// }
// catRandomWords();

// function to split word into array so visibility of each element can be controlled

function splitWord() {
    splitRandomWord = randomWord.split("");
    console.log(splitRandomWord)
}


// function to make splitRandomWord into masked html elements

function makeLetterElements() {

    for (let i = 0; i < splitRandomWord.length; i++) {
        let wordLetter = document.createElement('span');
        wordLetter.textContent = "_"
        wordLetter.className = "word-letter";
        wordLetter.style.margin = '5px';
        word.appendChild(wordLetter);
    }
}


// Playing the game


// Getting user guess, checking it's a letter, converting to lowercase, checking it hasn't been guessed before,
// clearing input field after use
function startGame() {
    
    userInput = document.getElementById("letter-input").value;
    
    if (!/^[A-Za-z]+$/.test(userInput)) {
        alertArea.style.color = "red";
        alertArea.textContent = "That is not a valid guess! Try again";
    } else {
        userInput = userInput.toLowerCase();
        if (guessedLetters.includes(userInput)) {
            alertArea.style.color = "red";
            alertArea.textContent = "You have already guessed that letter!"
        } else {
            guessedLetters.push(userInput);
            checkGuess(userInput);
        }
    }
    document.getElementById("letter-input").value = "";
    victory();
    hasLost();
    document.getElementById("letter-input").focus();
}
// call startGame on button click

startButton.onclick = startGame;



// function to check if guess is in word 
function checkGuess(letter) {
    let flag = false
    for (let i = 0; i < splitRandomWord.length; i++) {
        if (letter === splitRandomWord[0]) {
            document.getElementsByClassName("word-letter")[0].textContent = letter.toUpperCase();
        }
        if (letter === splitRandomWord[i]) {
            flag = true;
            document.getElementsByClassName("word-letter")[i].textContent = letter;
        }
    }
    if (flag) {
        correctGuesses.push(letter)
    } else {
        badGuesses.push(letter);
        appendBadGuess(letter);
        lifeCounter();
    }
    alertArea.textContent = "";
    
}

// append bad guess
function appendBadGuess(letter) {

    let badGuess = document.createElement('span');
    badGuess.className = "bad-guess";
    badGuess.textContent = letter.toUpperCase();
    userGuesses.appendChild(badGuess);
    
}


// decrease lives
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
       alertArea.style.color = "green";
       alertArea.style.fontSize = "50px"
       alertArea.textContent = "VICTORY!!! Click reset to play again.";
       startButton.disabled = true;
       
   }
}

// function to check if you've lost

function hasLost() {
    if (!livesLeft) {
        alertArea.textContent = `You lost! The word was "${randomWord}". Click reset to play again.`;
        startButton.disabled = true;

    }
}

//  function to create and replace lives
function resetLives () {

    for (let i = 0; i < livesLeft; i++) {
        let life = document.createElement('img');
        life.setAttribute( "src" , "https://upload.wikimedia.org/wikipedia/commons/6/60/Cat_silhouette.svg");
        life.className = "life";
        usedLives.appendChild(life);
    }
}


// function to end and reset 

function reset() {

    word.replaceChildren();
    userGuesses.replaceChildren();
    usedLives.replaceChildren();
    livesLeft = 9;
    resetLives();
    randomWordGenerator();
    splitWord();
    makeLetterElements();
    startButton.disabled = false;
    alertArea.textContent = "Let's play hangman! Try a letter to start.";
}

resetButton.onclick = reset;






