'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button Scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect();
  console.log(s1Coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll X/Y :', window.pageXOffset, window.pageYOffset);
  console.log('Current scroll X/Y :', window.pageXOffset, window.pageYOffset);
  console.log(
    'Height/Width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // Scrolling
  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   top: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  // Matching Strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});
///////////////////////////////////////
// Tabs
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  // console.log(clicked);
  // Guard Clause
  if (!clicked) return;
  // remove the active class
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  // Active tabs
  clicked.classList.add('operations__tab--active');
  // Activate content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

const hoverHandler = function (e) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(this);
    const link = e.target;
    // console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', hoverHandler.bind(0.5));
nav.addEventListener('mouseout', hoverHandler.bind(1));

// Sticky Navigation
// const section1Coordinates = section1.getBoundingClientRect();
// console.log(section1Coordinates);
// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);
//   if (window.scrollY > section1Coordinates.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);
// IntersectionObserver Api
// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);

//   });
// };
// const obsObject = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallBack, obsObject);
// observer.observe(section1);

// Reveal the Sections
const allSection = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading
const lazyImages = document.querySelectorAll('img[data-src]');
// console.log(lazyImages);
const lazyLoad = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const lazyObserver = new IntersectionObserver(lazyLoad, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});
lazyImages.forEach(img => lazyObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  let curSlide = 0;
  const maxLength = slides.length;

  // Functions
  const dotContainer = document.querySelector('.dots');
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class='dots__dot' data-slide="${i}"></button>`
      );
    });
  };
  const activateDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(cur => cur.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  const goToSlide = function (slide) {
    slides.forEach((cur, i) => {
      cur.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxLength - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxLength - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
  };

  const init = function () {
    createDots();
    activateDots(0);
    goToSlide(0);
  };
  init();
  // Handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDots(slide);
    }
  });
};
slider();
// Practice code
// Selecting Elements
/*console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

console.log(document.getElementById('section--1'));
const allbtns = document.getElementsByTagName('button');
console.log(allbtns);
console.log(document.getElementsByClassName('btn'));

//Creating and Inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent ='we use cookies for improve functionalities and analytics';
message.innerHTML =
  "we use cookies for improve functionalities and analytics <button class='btn bt--close--cookie'>Got it</button>";

// header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));
// header.before(message);
header.after(message);

message
  .querySelector('.bt--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// Styles
message.style.backgroundColor = '#37383d';
// message.style.width = '120%';
console.log(message.style.width);
console.log(message.style.color);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orangered');
// Attribute
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Bankist');
console.log(logo.src);
console.log(logo.getAttribute('src'));
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Non standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));

// classes
logo.classList.add('a', 'j');
logo.classList.remove('a', 'j');
logo.classList.toggle('a', 'j');
logo.classList.contains('a', 'j'); // not includes

console.log(logo.className);
// don't use it
logo.className = 'jonas';
// quite most of u sing this attribute
console.log(logo.dataset.versionNumber);
*/
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
//   const s1Coords = section1.getBoundingClientRect();
//   console.log(s1Coords);

//   console.log(e.target.getBoundingClientRect());

//   console.log('Current scroll X/Y :', window.pageXOffset, window.pageYOffset);
//   console.log('Current scroll X/Y :', window.pageXOffset, window.pageYOffset);
//   console.log(
//     'Height/Width viewport',
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );
//   // Scrolling
//   // window.scrollTo({
//   //   left: s1Coords.left + window.pageXOffset,
//   //   top: s1Coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });

// const h1 = document.querySelector('h1');
// const head1 = function (e) {
//   // console.log(e);
//   alert('AddEventListner: Great you are reading h1:)');
// };
// h1.addEventListener('mouseenter', head1);

// setTimeout(() => h1.removeEventListener('mouseenter', head1), 3000);
// // old way

// // h1.onmouseenter = function (e) {
// //   // console.log(e);
// //   alert('AddEventListner: Great you are reading h1:)');
// // };
// // rgb(255.255.255);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);
// // console.log(randomInt(0, 255));
// const randomClr = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomClr();
//   console.log('LINK', e.target, e.currentTarget);
//   // e.stopPropagation();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomClr();
//   console.log('Container', e.target, e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomClr();
//   console.log('NAV', e.target, e.currentTarget);
// });

/*
// DOM Traversing

// Going downward: child
const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'black';

// Going upwards: parent
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('header').style.background = 'var(--gradient-secondary)'; //Important one
h1.closest('h1').style.background = 'var(--gradient-primary)';

//Going sideways: Siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling);
console.log(h1.nextSibling);
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)';
  }
});
*/

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML parsed and DOM tree build!', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('Page Fully loaded', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = 'message';
// });
