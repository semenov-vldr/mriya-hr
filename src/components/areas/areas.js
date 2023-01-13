{

  // Переключение табов

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



  // Показать больше
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



}
