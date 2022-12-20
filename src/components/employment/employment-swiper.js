{

  const desktopWidth = window.matchMedia('(min-width: 1001px)').matches;

  let mySwiper;

  const swiperList = document.querySelectorAll('.employment__content-swiper');

  if (swiperList) createSwiper(swiperList);

  window.addEventListener('resize', () => createSwiper(swiperList))

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

          1000: {

          },

        }
      });

      if (desktopWidth) mySwiper.destroy()

    })

  };










}
