{

  const employment = document.querySelector('.employment');

  const desktopWidth = window.matchMedia('(min-width: 1000px)');

  if (employment) calcMarginForSteps()

// Добавление margin-top для каждой номера шага из рассчета высоты блока employment-steps-item + gap списка
  function calcMarginForSteps () {

    const stepsList = employment.querySelector('.employment-steps__list');
    const employmentStepsItems = employment.querySelectorAll('.employment-steps__item');
    const swiperPaginationBullets = employment.querySelectorAll('.swiper-pagination-bullet');

    if (desktopWidth.matches) {

      const gapList = +getComputedStyle(stepsList).gap.replace(/\D/g,'');

      swiperPaginationBullets[0].style.marginBottom = '0';
      swiperPaginationBullets.forEach((bullet, indexBullet) => {

        const heightBullet = bullet.offsetHeight;

        if (indexBullet > 0) {
          const heightBlock = employmentStepsItems[indexBullet-1].offsetHeight;
          bullet.style.margin = '0';
          bullet.style.marginTop = `${heightBlock + gapList - heightBullet + 1}px`;
        }
      })
    }
  };


}


//let previousPosition = window.scrollTop || document.documentElement.scrollTop;

// const employment = document.querySelector('.employment');
//
// const widthDesktop = window.matchMedia('(min-width: 1000.1px)').matches;
//
//
// function inActiveAllImages (images) {
//   images.forEach(image => image.classList.remove('js-photo-active'));
// };
//
// function addClassPhotoActive (el) {
//   el.classList.add('js-photo-active');
// };
//
// if (employment) {
//
//   const stepNumbers = employment.querySelectorAll('.employment-steps-item__number');
//   const line = employment.querySelector('.employment-steps__line--change');
//   const images = employment.querySelectorAll('.employment__images img');
//
//
//   if (widthDesktop) {
//     images[0].classList.remove('js-photo-active');
//     lineAnimation(employment)
//   }
//
//
//   window.addEventListener('resize', () => {
//     if (widthDesktop) lineAnimation(employment);
//   });
//
//
//   function lineAnimation() {
//
//     const options = {
//       rootMargin: '100% 0px -30%',
//       threshold: 1,
//     };
//
//
//     function callbackStep(entries) {
//       entries.forEach((entry) => {
//         let currentPosition = window.scrollTop || document.documentElement.scrollTop;
//         const el = entry.target;
//         const number = el.dataset.number - 1;
//         if (entry.isIntersecting) {
//           el.classList.add('js-scroll-animate');
//
//           if (previousPosition < currentPosition) {
//             inActiveAllImages(images);
//             addClassPhotoActive(images[number]);
//           }
//         } else {
//           el.classList.remove('js-scroll-animate');
//           inActiveAllImages(images);
//           (number - 1 >= 0) ? addClassPhotoActive(images[number - 1]) : addClassPhotoActive(images[0]);
//         }
//       })
//     };
//
//
//     function callbackLine(entries) {
//       entries.forEach((entry) => {
//         const el = entry.target;
//         if (entry.isIntersecting) {
//           const startPosition = window.scrollY;
//
//           function setHeightLine() {
//             let heightValue = window.scrollY - startPosition;
//             el.style.height = `${heightValue}px`;
//           };
//           window.addEventListener('scroll', setHeightLine);
//         }
//       })
//     };
//
//     const observerStep = new IntersectionObserver(callbackStep, options);
//     const observerLine = new IntersectionObserver(callbackLine, options);
//
//     stepNumbers.forEach(stepNum => observerStep.observe(stepNum));
//     observerLine.observe(line);
//
//   };
//
//
// }
