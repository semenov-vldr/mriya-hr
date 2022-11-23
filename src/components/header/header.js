const desktopWidth = window.matchMedia('(min-width: 1000.1px)');

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


  const headerLinks = headerNav.querySelectorAll('.header-nav__link');
  headerLinks.forEach(link => {
    const location = window.location.href;
    if (location === link.href) {
      link.classList.add('js-link-active');
      if (link.classList.contains('student-link')) {
        header.classList.add('js-student-page');

        burger.addEventListener('click', () => {
            header.classList.toggle('js-student-page');
        });

      } else header.classList.remove('js-student-page');

    }

  })
}


