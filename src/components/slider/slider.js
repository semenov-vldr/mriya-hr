{

  let mySwiper;

  const swiperList = document.querySelectorAll('.popular-vacancies__slider, .success__slider');

if (swiperList) createSwiper(swiperList);



function createSwiper (swiperList) {
  swiperList.forEach(swiper => {

    mySwiper = new Swiper(swiper, {

      navigation: {
        nextEl: '.slider-nav__next',
        prevEl: '.slider-nav__prev',
      },

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

        1100: {
          slidesPerView: 4
        },

      }
    });
  })
};










}
