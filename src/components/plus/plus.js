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
