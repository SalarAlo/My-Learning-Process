'use strict';

///////////////////////////////////////
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.getElementById('section--1');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');

const navLinks = document.querySelectorAll('.nav__link');
const navContainer = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');

const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

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

// add our cookies accepter to the webpage
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `
We use cookies for improved functionality and analitics.
<button class = btn btn--close-cookie>
  Got it!
</button>`;

document.querySelector('header').prepend(message);

// remove cookie accepter if clicked on the gotIt Button
message.querySelector('.btn').addEventListener('click', function () {
  message.remove();
});

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: "smooth" })
});

// my solution


// udemy solution
navContainer.addEventListener('click', function (e) {
  e.preventDefault();

  const sectionTarget = document.querySelector(e.target.getAttribute('href'));

  e.target.classList.contains('nav__link') &&
    sectionTarget.scrollIntoView({ behavior: "smooth" });
});

// navigation links 
const changeTab = function(e){
  const tabClicked = e.target;

  if(!tabClicked.classList.contains('btn'))
    return;

  [...this.children].forEach(child => child.classList.remove('operations__tab--active'));
  tabsContent.forEach(child => child.classList.remove('operations__content--active'));

  tabClicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${tabClicked.getAttribute('data-tab')}`).classList.add('operations__content--active');
};
navContainer.addEventListener('click', changeTab);

// hover effect
const setHoverEffectNavBar = function(e, mouseEnter){
  const link = e.target;
  const logo = link.closest('.nav').querySelector('img');

  const siblings = 
  Array.from(link.closest('.nav')
  .querySelectorAll('.nav__link'))
  .filter(elem => elem != link);
  siblings.push(logo);
  

  if(e.target.classList.contains('nav__link'))
    (mouseEnter) ? siblings.forEach(elem => elem.style.opacity = '0.6'): siblings.forEach(elem => elem.style.opacity = '1');
};
nav.addEventListener('mouseover', (e) => setHoverEffectNavBar(e, true));
nav.addEventListener('mouseout', (e) => setHoverEffectNavBar(e, false));

// implement sticky navigation if section1 has been reached
const stickyNav = function(entries){
  (entries[0].isIntersecting) ? nav.classList.remove('sticky') : nav.classList.add('sticky');
};

const navOptions = {
  // viewport
  root: null,

  // 0 percent visible
  threshold: 0,

  // delay for threshold
  rootMargin: '-' + getComputedStyle(nav).height,
};

const headerObserver = new IntersectionObserver(stickyNav, navOptions);
headerObserver.observe(header);

// implement transition on scroll
sections.forEach(function(section){
  section.classList.add('section--hidden');

  const onScrollAppear = function(entries, observer){
    const currentEntrie = entries[0];

    if(currentEntrie.isIntersecting){
      section.classList.remove('section--hidden');
      observer.unobserve(section);
    }
  };

  const sectionOptions = {
    root: null,
    threshold: 0.15,
  };

  const sectionObserver = new IntersectionObserver(onScrollAppear, sectionOptions);
  sectionObserver.observe(section);
});

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
const headerLeft = (entries) => console.log('header has been ' + (entries[0].isIntersecting ? 'entered' : 'left'));

const observerOptions = {
  root: null,
  threshold: 0,
}

const observer = new IntersectionObserver(headerLeft, observerOptions);
observer.observe(header);
observer.observe(section1);
