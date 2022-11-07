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





