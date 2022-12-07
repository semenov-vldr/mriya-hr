const desktopWidth = window.matchMedia('(min-width: 1000.1px)');

let previousPosition = window.scrollTop || document.documentElement.scrollTop;

const header = document.querySelector('.header');
const burger = header.querySelector('.header__burger');
const headerNav = header.querySelector('.header__nav');

if (headerNav) {
  burger.addEventListener('click', () => {
    headerNav.classList.toggle('js-active-menu');
    burger.classList.toggle('js-active-menu');
    toggleScrollBody();
  });


  window.addEventListener('resize', () => {
    if (desktopWidth.matches) {
      headerNav.classList.remove('js-active-menu');
      burger.classList.remove('js-active-menu');
      unblockScrollBody();
    }
  });


  const headerLinks = header.querySelectorAll('.header-nav__link, .header__logo');
  headerLinks.forEach(link => {
    const location = window.location.href;
    if (location === link.href) {
      link.classList.add('js-link-active');
      if (link.classList.contains('js-student-link')) {
        header.classList.add('js-student-page');

        burger.addEventListener('click', () => {
            header.classList.toggle('js-student-page');
        });

        window.addEventListener("scroll", () => {
          let currentPosition = window.scrollTop || document.documentElement.scrollTop;
          if ( previousPosition < currentPosition) {
            header.classList.add('js-scroll');
            header.classList.remove('js-student-page');
          }
          else {
            header.classList.remove('js-scroll');
            header.classList.add('js-student-page');
          }
        });

      }
      else {
        header.classList.remove('js-student-page');

        window.addEventListener("scroll", () => {
          let currentPosition = window.scrollTop || document.documentElement.scrollTop;
          if ( previousPosition < currentPosition) {
            header.classList.add('js-scroll');
          }
          else {
            header.classList.remove('js-scroll');
          }
        });
      }
    }
  })




}


