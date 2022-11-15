const desktopWidth = window.matchMedia('(min-width: 1000.1px)');

const header = document.querySelector('.header');
const headerNav = header.querySelector('.header__nav');
const body = document.querySelector('body');

if (headerNav) {
  const burger = header.querySelector('.header__burger');
  burger.addEventListener('click', () => {
    headerNav.classList.toggle('js-active-menu');
    body.classList.toggle('js-block-scroll');
    burger.classList.toggle('js-active-menu');
  })


  window.addEventListener('resize', () => {
    if (desktopWidth.matches) {
      headerNav.classList.remove('js-active-menu');
      body.classList.remove('js-block-scroll');
      burger.classList.remove('js-active-menu');
    }
  })

}


