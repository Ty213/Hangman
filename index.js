var words = ["cat","dog","french","dude",
"hamburger","eagle","america","bear","beer","water"];
var curWord = words[getRandomInt(0,words.length)].split("");
var blanks = getBlanks(curWord);
var lives = 5;
var alreadyGuessed = [];
var blanksGame = document.querySelector('.game__blanks');
var userGuess = document.querySelector('.game__input');
var guessed = document.querySelector('.guessed__list');
var livesCounter = document.querySelector('.lives__counter');
var gameLives = document.querySelector('.game__lives');
var guessButton = document.querySelector('.game__guess');
var resetButton = document.querySelector('.reset');
var hintButton = document.querySelector('.hint');
var gamePrompt = document.querySelector('.game_prompt');

hintButton.addEventListener("click", function() {
    hint();
})

resetButton.addEventListener("click", function() {
    location.reload();
})

guessButton.addEventListener("click", function(){
    console.log(checkGuess(userGuess.value,curWord));
    if(checkGuess(userGuess.value,curWord)) {
        updateBlanks(userGuess.value,curWord,blanks);
        // updateHTML(blanks,lives);
    } else {
        lives--;
        // updateHTML(blanks,lives);
    }
    alreadyGuessed.push(userGuess.value);
    updateHTML(blanks,lives);
    winLose(blanks,lives);
    userGuess.value = "";
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getBlanks(word) {
    let blanks = word.map(() => '_');
      return blanks;
}

function updateBlanks(guess,word,blanks) {
    for(let i = 0; i < word.length; i++) {
        if(guess === word[i]) {
            blanks[i] = guess;
        }
    }
}

function updateHTML(blanks,lives) {
    blanksGame.innerHTML = "";
    for(let i = 0; i < blanks.length; i++) {
        blanksGame.innerHTML += blanks[i] + " ";
    }
    livesCounter.innerHTML = lives;
    updateGuesses(alreadyGuessed);
}

function checkGuess(guess,word) {
    if(word.indexOf(guess) >= 0) {
        return true;
    }
    return false;
}

function winLose(blanks,lives) {
    if(lives === 0) {
        lost();
    }
    if(blanks.indexOf("_") < 0) {
        win();
    }
}

function lost() {
    blanksGame.style.fontSize = '3em';
    hintButton.style.display = "none";
    guessButton.style.display = "none";
    userGuess.style.display = "none";
    gamePrompt.style.display = "none";
    gameLives.style.display = "none";
    blanksGame.innerHTML = "You lose. Play again?"
}

function win() {
    blanksGame.style.fontSize = '3em';
    hintButton.style.display = "none";
    guessButton.style.display = "none";
    userGuess.style.display = "none";
    gamePrompt.style.display = "none";
    gameLives.style.display = "none";
    blanksGame.innerHTML = "You win! Play again?"
}

function hint() {
    var hintLetter = curWord[getRandomInt(0,curWord.length)];
    if(alreadyGuessed.indexOf(hintLetter) < 0) {
    console.log('hint letter:', hintLetter, "curWord:", curWord);
    alreadyGuessed.push(hintLetter);
    updateBlanks(hintLetter,curWord,blanks);
    lives--;
    updateHTML(blanks,lives);
    winLose(blanks,lives);
    } else {
        hint();
    }
}

function updateGuesses(guesses) {
    guessed.innerHTML = "";
    for(let i = 0; i < guesses.length; i++) {
        var item = document.createElement("li");
	    var text = document.createTextNode(guesses[i]);
        item.appendChild(text);
        guessed.appendChild(item);
    }
}
updateHTML(blanks,lives);