const burger = document.querySelector('.header__menu-button');
const burgerMenu = document.querySelector('.header__menu');
const items = document.querySelectorAll('.header__item');

burger.addEventListener('click', () => {
  burgerMenu.classList.toggle('header__menu_active');
  document.addEventListener('click', e => {
    const target = e.target;
    if ((target !== burgerMenu) && (target !== burger)) {
      burgerMenu.classList.remove('header__menu_active');
    }
  });
});


items.forEach(item => {
  item.addEventListener('click', () => {
    burgerMenu.classList.toggle('header__menu_active');
  });
});


