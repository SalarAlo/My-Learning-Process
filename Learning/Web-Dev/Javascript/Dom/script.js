'use strict';

///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.getElementById('section--1');

const navLink = document.querySelector('.nav__link');
const linkContainer = document.querySelector('.nav__links');
const navContainer = document.querySelector('nav');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden'))
    closeModal();
  
});

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `
We use cookies for improved functionality and analitics.
<button class = btn btn--close-cookie>
  Got it!
</button>`;

// adds an element as the first child
document.querySelector('header').prepend(message);

// to select a child you can just
message.querySelector('.btn').addEventListener('click', function(){
  message.remove();
});

btnScrollTo.addEventListener('click', function(){
  section1.scrollIntoView({behavior: "smooth"})
});


//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////