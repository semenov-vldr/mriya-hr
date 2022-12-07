
{
  let mySwiper;

  const swiperList = document.querySelectorAll('.employment-swiper');

  if (swiperList) {
    swiperList.forEach(swiper => {

      mySwiper = new Swiper(swiper, {

        navigation: {
          nextEl: '.slider-nav__next',
          prevEl: '.slider-nav__prev',
        },

        uniqueNavElements: true,

        // Бесконечная прокрутка
        //loop: true,

        // Откл функционала, если слайдов меньше, чем нужно
        watchOverflow: true,

        slidesPerView: 1,

        effect: "fade",

        autoplay: {
          // delay: 5000,
          // disableOnInteraction: false,
        },

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

          1000: {

            loop: true,
            slidesPerView: 1,

            direction: "vertical",

            pagination: {
              el: ".swiper-pagination",
              clickable: true,

              renderBullet: function (index, className) {
                return '<span class="' + className + '">' + ++index + '</span>';
              }
            },
          }

        }
      });





    })



  }








}
