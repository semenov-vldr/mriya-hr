{

  const employment = document.querySelector('.employment');

  const desktopWidth = window.matchMedia('(min-width: 1001px)').matches;

  if (employment && desktopWidth) ImagesChangeFade();


  function ImagesChangeFade () {

    const employmentSteps = document.querySelectorAll('.employment-steps__item');
    const images = employment.querySelectorAll('.employment__images img');

    images.forEach(img => img.classList.add('js-hidden'));
    employmentSteps.forEach(step => step.classList.remove('js-step-active'));

    images[0].classList.remove('js-hidden');
    employmentSteps[0].classList.add('js-step-active');

    employmentSteps.forEach((step, indexStep) => {
      step.addEventListener('click', () => {
        images.forEach(img => img.classList.add('js-hidden'));
        employmentSteps.forEach(step => step.classList.remove('js-step-active'));

        step.classList.add('js-step-active');
        images[indexStep].classList.remove('js-hidden');
      })
    })
  }



  // Swiper
  let mySwiper;

  const swiperList = document.querySelectorAll('.employment__content-swiper');

  if (swiperList) {
    createSwiper(swiperList);
    window.addEventListener('resize', () => createSwiper(swiperList))
  }



  function createSwiper (swiperList) {
    swiperList.forEach(swiper => {

      mySwiper = new Swiper(swiper, {

        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
        },

        uniqueNavElements: true,

        slidesPerView: 4,

        // Бесконечная прокрутка
        //loop: true,

        // Откл функционала, если слайдов меньше, чем нужно
        watchOverflow: true,

        //centeredSlides: true,

        // Отступ между слайдами
        spaceBetween: 24,

        // Стартовый слайд
        initialSlide: 0,

        // Брейк поинты (адаптив)
        // Ширина экрана
        breakpoints: {
          320: {
            slidesPerView: 1.5,
            spaceBetween: 16,
          },

          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          768: {
            slidesPerView: 3
          },
        }
      });

      if (desktopWidth) mySwiper.destroy();

    })

  };






}
