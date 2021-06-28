'use strict';

const scoreEl = [];
scoreEl.push(document.querySelector('#score--0'));
scoreEl.push(document.querySelector('#score--1'));
const currentEl = [];
currentEl.push(document.getElementById('current--0'));
currentEl.push(document.getElementById('current--1'));
const playerEl = [];
playerEl.push(document.querySelector('.player--0'));
playerEl.push(document.querySelector('.player--1'));
const diceEl = document.querySelector('.dice');
const rollEl = document.querySelector('.btn--roll');
const newGameEl = document.querySelector('.btn--new');
const holdEl = document.querySelector('.btn--hold');
const gameWinScore = 25;

let score = [0, 0];
let current = [0, 0];
let player = 0;
let nonCurrentPlayer = 1;
let playing = false;

const initialize = function () {
  for (let i = 0; i < 2; i++) {
    score[i] = 0;
    current[i] = 0;
    scoreEl[i].textContent = score[i];
    currentEl[i].textContent = current[i];
    playerEl[i].classList.remove('player--winner');
  }
  diceEl.classList.add('hidden');
  player = 0;
  nonCurrentPlayer = 1;
  playing = true;
};
initialize();

const switchPlayer = function () {
  nonCurrentPlayer = player;
  player = (player + 1) % 2;
  playerEl[nonCurrentPlayer].classList.toggle('player--active');
  playerEl[player].classList.toggle('player--active');
};

newGameEl.addEventListener('click', initialize);

rollEl.addEventListener('click', event => {
  if (playing) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;
    if (diceRoll > 1) {
      current[player] += diceRoll;
      currentEl[player].textContent = current[player];
    } else {
      current[player] = 0;
      currentEl[player].textContent = current[player];
      switchPlayer();
    }
  }
});

holdEl.addEventListener('click', event => {
  if (playing) {
    score[player] += current[player];
    scoreEl[player].textContent = score[player];
    current[player] = 0;
    currentEl[player].textContent = current[player];
    if (score[player] >= gameWinScore) {
      playerEl[player].classList.add('player--winner');
      playing = false;
      // To ensure that all the changes are written to
      // the screen, we do two embedded
      // requestAnimationFrame()'s
      //   requestAnimationFrame(() => {
      //     requestAnimationFrame(() => {
      //       alert(`Player ${player + 1} wins!`);
      //     });
      //   });
    } else {
      switchPlayer();
    }
  }
});
