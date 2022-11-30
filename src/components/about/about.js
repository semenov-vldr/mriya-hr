{

  let mySwiper;

  //const swiperList = document.querySelectorAll('.about__swiper');

  //if (swiperList) createSwiper(swiperList);



  function createSwiper (swiperList) {
    swiperList.forEach(swiper => {

      mySwiper = new Swiper(swiper, {

        uniqueNavElements: true,

        slidesPerView: 1,

        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },

        effect: "fade",

        // Бесконечная прокрутка
        //loop: true,

        // Откл функционала, если слайдов меньше, чем нужно
        //watchOverflow: true,

        //centeredSlides: true,

        // Отступ между слайдами
        spaceBetween: 24,

        // Стартовый слайд
        initialSlide: 0,


      });

    })
  };











}
