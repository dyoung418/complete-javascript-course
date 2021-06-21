'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsShowModal = document.querySelectorAll('.show-modal');

btnsShowModal.forEach((button, index) =>
  button.addEventListener('click', function () {
    console.log(`hi from ${index}`);
    console.log(` or from ${this.textContent}`);
  })
);

console.log(btnsShowModal);
