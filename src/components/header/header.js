const header = document.querySelector('.header');
const headerNav = header.querySelector('.header__nav');
const page = document.querySelector('.page');

if (headerNav) {
  const burger = header.querySelector('.header__burger');
  burger.addEventListener('click', () => {
    headerNav.classList.toggle('js-active-menu')
   page.classList.toggle('js-block-scroll');
    burger.classList.toggle('js-active-menu')
  })
}


