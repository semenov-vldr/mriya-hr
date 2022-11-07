
{
  const data = {
    // класс для всего блока, в котором мы работаем
    classWrapper: '.areas',
    // класс контента, который будет меняться
    classImg: '.areas__images img',
    // класс текста, который будет меняться
    classText: '.areas__description',
    // класс табов
    classNav: '.areas__item',
    // имя активного класса
    activeClass: 'js-area-active',
    // data-атрибут для табов
    dataNameNav: 'data-area',
    // data-атрибут для фото
    dataNameImg: 'data-image',
    dataNameText: 'data-description'
  }

  selectAreas(data)

  function selectAreas ( { classWrapper, classImg, classText, classNav, activeClass,  dataNameNav, dataNameImg, dataNameText} ) {

    const blockWrapper = document.querySelector(classWrapper);

    if (blockWrapper) {

      const images = blockWrapper.querySelectorAll(classImg);
      const texts = blockWrapper.querySelectorAll(classText);
      const tabs = blockWrapper.querySelectorAll(classNav);

      const addClassActive = (item) => item.classList.add(activeClass);
      const removeClassActive = (item) => item.classList.remove(activeClass);

      addClassActive(images[0]);
      addClassActive(texts[0]);
      addClassActive(tabs[0]);


      tabs.forEach(tab => {
        tab.addEventListener('click', function() {
          images.forEach(removeClassActive);
          texts.forEach(removeClassActive);
          tabs.forEach(removeClassActive);

          addClassActive(tab);
          const numberTab = tab.getAttribute(dataNameNav);
          images.forEach(image => {
            const numberImg = image.getAttribute(dataNameImg);
            if (numberTab === numberImg) addClassActive(image);
          });
          texts.forEach(text => {
            const numberImg = text.getAttribute(dataNameText);
            if (numberTab === numberImg) addClassActive(text);
          });

        });
      });

    }

  };


}

const areas = document.querySelector('.areas');

if (areas) {
  const showMore = areas.querySelector('.areas__item--more');

  const startItems = 8;

  const areasItems = areas.querySelectorAll('.areas__item');
  const areasItemsLength = areasItems.length;

  showMore.textContent = `+${areasItemsLength - startItems}`;

  showMore.addEventListener('click', () => {
    areasItems.forEach(el => el.classList.add('js-visible'));
    showMore.classList.add('hidden');
  })

  if (areasItemsLength < startItems + 1) showMore.classList.add('hidden');


}

const header = document.querySelector('.header');
const headerNav = header.querySelector('.header__nav');

if (headerNav) {
  const burger = header.querySelector('.header__burger');
  burger.addEventListener('click', () => {
    headerNav.classList.toggle('js-active-menu')
  })
}



const plus = document.querySelector('.plus');

if (plus) {

  const plusTabs = document.querySelectorAll('.plus-tabs__item');
  plusTabs.forEach(tab => {
   plusTabs[0].classList.add('js-tabs-active');
    tab.addEventListener('click', () => {
      plusTabs.forEach(tab => tab.classList.remove('js-tabs-active') );
      tab.classList.add('js-tabs-active');
    })
  })


  {
    const data = {
      // класс для всего блока, в котором мы работаем
      classWrapper: '.advantages',
      // класс контента, который будет меняться
      classSlide: '.advantages__images-item',
      // класс табов
      classNav: '.accordion__item',
      // имя активного класса
      activeClass: 'js-advantages-active',
      // data-атрибут для табов
      dataNameNav: 'data-advant',
      // data-атрибут для слайда
      dataNameSlide: 'data-image',
    }

    tabsSlides(data)
  }

  {
    const data = {
      // класс для всего блока, в котором мы работаем
      classWrapper: '.plus',
      // класс контента, который будет меняться
      classSlide: '.plus__content',
      // класс табов
      classNav: '.plus-tabs__item',
      // имя активного класса
      activeClass: 'js-plus-active',
      // data-атрибут для табов
      dataNameNav: 'data-tab',
      // data-атрибут для слайда
      dataNameSlide: 'data-content',
    }

    tabsSlides(data)
  }








}


{

  //const mobileWidth = window.matchMedia('(max-width: 768px)').matches;

  let mySwiper;

  const swiperList = document.querySelectorAll('.swiper');

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
          slidesPerView: 1,
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







}

const accordionList = document.querySelectorAll('.accordion');


if (accordionList) {
  accordionList.forEach(accordion => {

    const accordionItems = accordion.querySelectorAll('.accordion__item'); // список элементов аккордиона

    const toggleClass = (item) => item.classList.toggle('js-accordion-active');
    const removeClass = (item) => item.classList.remove('js-accordion-active');

    accordionItems.forEach(accordionItem => {
      accordionItem.addEventListener('click', function ()  {
        accordionItems.forEach(item => (item !== this) ? removeClass(item) : false);
        toggleClass(this);
      });
    });

  })
}






function tabsSlides ( { classWrapper, classSlide, classNav, activeClass,  dataNameNav, dataNameSlide} ) {

  const blockWrapper = document.querySelector(classWrapper);

  if (blockWrapper) {

    const slides = blockWrapper.querySelectorAll(classSlide);
    const tabs = blockWrapper.querySelectorAll(classNav);

    const addClassActive = (item) => item.classList.add(activeClass);
    const removeClassActive = (item) => item.classList.remove(activeClass);

    addClassActive(tabs[0]);
    addClassActive(slides[0]);

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(removeClassActive);
        slides.forEach(removeClassActive);
        addClassActive(tab);
        const numberTab = tab.getAttribute(dataNameNav);
        slides.forEach(slide => {
          const numberSlide = slide.getAttribute(dataNameSlide);
          if (numberTab === numberSlide) addClassActive(slide);
        });
      });
    });

  }

};
