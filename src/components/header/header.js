const header = document.querySelector('.header');
const headerNav = header.querySelector('.header__nav');

if (headerNav) {
  const burger = header.querySelector('.header__burger');
  burger.addEventListener('click', () => {
    headerNav.classList.toggle('js-active-menu')
  })
}


