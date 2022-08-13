const burger = document.querySelector('.header__menu-button');
const burgerMenu = document.querySelector('.header__menu');

burger.addEventListener('click', () => {
  burgerMenu.classList.toggle('header__menu_active');
});
