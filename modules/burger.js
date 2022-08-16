

const burger = document.querySelector('.header__menu-button');
const burgerMenu = document.querySelector('.header__menu');
let startTime = NaN;
const durationOpacity = 1500;

const animate = (timestamp) => {
  startTime ||= timestamp;
  const progress = (timestamp - startTime) / durationOpacity;
  const x = 360 * progress;
  burgerMenu.style.transform = `rotateZ(${x}deg)`;
  if (progress < 1) {
    requestAnimationFrame(animate);
  } else {
    startTime = NaN;
  }
};


burger.addEventListener('click', (timestamp) => {
  burgerMenu.classList.toggle('header__menu_active');
  requestAnimationFrame(animate);
});

