'use strict';

let secretNumber;
let currentScore;
let currentHiScore = 0;
let gameOver;
const guess = document.querySelector('.guess');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const hiScore = document.querySelector('.highscore');
const displayNumber = document.querySelector('.number');

const initialize = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  console.log(secretNumber);
  currentScore = 20;
  score.textContent = currentScore;
  hiScore.textContent = currentHiScore;
  guess.value = null;
  displayNumber.textContent = '?';
  message.textContent = 'Start guessing';
  document.querySelector('body').style.removeProperty('background-color');
  displayNumber.style.removeProperty('width');
  gameOver = false;
  document.querySelector('.check').style.visibility = 'visible';
};

initialize();

// Event listeners
document.querySelector('.again').addEventListener('click', function () {
  initialize();
});

const processIncorrectGuess = function (currentGuess) {
  message.textContent =
    currentGuess < secretNumber
      ? 'Nope, too low.  Guess again'
      : 'Nope, too high, Guess again';
  guess.value = null;
};

document.querySelector('.check').addEventListener('click', function () {
  const guessedNumber = Number(guess.value);

  if (gameOver) {
    return;
  }
  if (!guessedNumber) {
    message.textContent = 'No number entered!';
    displayNumber.textContent = '?';
    return;
  }
  displayNumber.textContent = guessedNumber;
  currentScore -= 1;
  score.textContent = currentScore;
  if (currentScore == 0) {
    message.textContent = `Game over.  The answer was ${secretNumber}!`;
    gameOver = true;
    return;
  }
  if (guessedNumber == secretNumber) {
    message.textContent = 'CORRECT!';
    document.querySelector('body').style.backgroundColor = '#60b347';
    displayNumber.style.width = '30rem';
    if (currentScore > currentHiScore) {
      currentHiScore = currentScore;
      hiScore.textContent = currentHiScore;
    }
    document.querySelector('.check').style.visibility = 'hidden';
    gameOver = true;
  } else {
    processIncorrectGuess(guessedNumber);
  }
});
