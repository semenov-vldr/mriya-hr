const desktopWidth = window.matchMedia('(min-width: 1000.1px)');

const header = document.querySelector('.header');
const burger = header.querySelector('.header__burger');
const headerNav = header.querySelector('.header__nav');

if (headerNav) {
  burger.addEventListener('click', () => {
    headerNav.classList.toggle('js-active-menu');
    burger.classList.toggle('js-active-menu');
    toggleScrollBody()
  })


  window.addEventListener('resize', () => {
    if (desktopWidth.matches) {
      headerNav.classList.remove('js-active-menu');
      burger.classList.remove('js-active-menu');
      unblockScrollBody()
    }
  })

}


