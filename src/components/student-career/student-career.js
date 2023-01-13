
{

  let mySwiper;

  const swiperList = document.querySelectorAll('.student-career-images__container');

  swiperList.forEach(swiper => {

    mySwiper = new Swiper(swiper, {

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
          slidesPerView: 1.4,
          spaceBetween: 16,
        },

        480: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },

        768: {
          slidesPerView: 3.2
        },

        1100: {
          slidesPerView: 3.2
        },

      }
    });

  })







}
