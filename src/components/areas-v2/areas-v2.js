{

  // Переключение табов

  const data = {
    // класс для всего блока, в котором мы работаем
    classWrapper: '.areas-v2',
    // класс текста, который будет меняться
    classText: '.areas-v2__description',
    // класс табов
    classNav: '.areas-v2__item',
    // имя активного класса
    activeClass: 'js-area-active',
    // data-атрибут для табов
    dataNameNav: 'data-area',
    dataNameText: 'data-description',
  }

  selectAreas(data)

  function selectAreas ( { classWrapper, classText, classNav, activeClass,  dataNameNav, dataNameText} ) {

    const blockWrapper = document.querySelector(classWrapper);

    if (blockWrapper) {

      const texts = blockWrapper.querySelectorAll(classText);
      const tabs = blockWrapper.querySelectorAll(classNav);

      const addClassActive = (item) => item.classList.add(activeClass);
      const removeClassActive = (item) => item.classList.remove(activeClass);

      addClassActive(texts[0]);
      addClassActive(tabs[0]);


      tabs.forEach(tab => {
        tab.addEventListener('click', function() {
          texts.forEach(removeClassActive);
          tabs.forEach(removeClassActive);

          addClassActive(tab);
          const numberTab = tab.getAttribute(dataNameNav);

          texts.forEach(text => {
            const numberImg = text.getAttribute(dataNameText);
            if (numberTab === numberImg) addClassActive(text);
          });
        });
      });
    }
  };



  // Показать больше
  const areas = document.querySelector('.areas-v2');

  if (areas) {
    const showMore = areas.querySelector('.areas-v2__item--more');

    const startItems = 12;

    const areasItems = areas.querySelectorAll('.areas-v2__item');
    const areasItemsLength = areasItems.length;

    showMore.textContent = `+${areasItemsLength - startItems}`;

    showMore.addEventListener('click', () => {
      areasItems.forEach(el => el.classList.add('js-visible'));
      showMore.classList.add('hidden');
    })

    if (areasItemsLength < startItems + 1) showMore.classList.add('hidden');


    // скролл
    const descriptionContent = areas.querySelector('.areas-v2__description-content');

    areasItems.forEach(areasItem => {
      areasItem.addEventListener('click', () => {
        descriptionContent.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      })
    });


  }



}
