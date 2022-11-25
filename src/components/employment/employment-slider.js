
{

  const mobileWidth = window.matchMedia('(max-width: 1000px)').matches;

  let mySwiper;

  const swiperList = document.querySelectorAll('.employment-swiper');

  if (swiperList && mobileWidth) {
    swiperList.forEach(swiper => {

      mySwiper = new Swiper(swiper, {
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true,
        // },
        navigation: {
          nextEl: '.slider-nav__next',
          prevEl: '.slider-nav__prev',
        },

        // scrollbar: {
        //   el: '.swiper-scrollbar',
        //   draggable: true,
        // },

        createElements: true,
        slideClass: 'employment__image-item',

        uniqueNavElements: true,

        slidesPerView: 1,

        // Бесконечная прокрутка
        //loop: true,

        // Откл функционала, если слайдов меньше, чем нужно
        watchOverflow: true,

        //centeredSlides: true,

        // Отступ между слайдами
        spaceBetween: 20,

        // Стартовый слайд
        initialSlide: 0,

        // Брейк поинты (адаптив)
        // Ширина экрана
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 16,
          },

          480: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },

          768: {
            slidesPerView: 1.5
          },

          // 1100: {
          //   slidesPerView: 2.2
          // },

        }
      });

    })
  }







}
