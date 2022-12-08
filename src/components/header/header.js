const desktopWidth = window.matchMedia('(min-width: 1001px)');

let previousPosition = window.scrollTop || document.documentElement.scrollTop;

const header = document.querySelector('.header');
const burger = header.querySelector('.header__burger');

if (header) {
  burger.addEventListener('click', () => {
    header.classList.toggle('js-active-menu');
    toggleScrollBody();
  });


  window.addEventListener('resize', () => {
    if (desktopWidth.matches) {
      header.classList.remove('js-active-menu');
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
          const currentPosition = window.scrollTop || document.documentElement.scrollTop;
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
          const currentPosition = window.scrollTop || document.documentElement.scrollTop;
          ( previousPosition < currentPosition) ? header.classList.add('js-scroll') : header.classList.remove('js-scroll');
        });
      }
    }
  })




}


