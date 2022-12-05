const vacancies = document.querySelector('.vacancies');

if (vacancies) {

  function addClassFilterActive (items) {
    items.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('js-filter-active');
      })
    })
  };

  const filterTitles = vacancies.querySelectorAll('.filter__title');
  addClassFilterActive(filterTitles);


  // Показать больше
  const showMoreList = vacancies.querySelectorAll('.filter__button-more');
  showMoreList.forEach(showMore => {
    const filterItems = showMore.parentNode.querySelectorAll('.filter__item');

    const startItems = 5;
    const filterItemsLength = filterItems.length;

    showMore.addEventListener('click', (evt) => {
      filterItems.forEach(el => el.classList.toggle('js-visible'));
      showMore.classList.add('visually-hidden');
    })
    if (filterItemsLength < startItems + 1) showMore.classList.add('visually-hidden');
  })



  // Показать фильтр на моб. версии по нажатию на кнопку

  const filterSettingBtn = vacancies.querySelector('.vacancies__filter-setting');
  const filters = vacancies.querySelector('.vacancies__filters');
  const filtersClose = filters.querySelector('.filters__close');

  const addClassFilterOpen = () => {
    filters.classList.add('js-filter-open');
    blockScrollBody();
  }
  const removeClassFilterOpen = () => {
    filters.classList.remove('js-filter-open');
    unblockScrollBody();
  }

  filterSettingBtn.addEventListener('click', addClassFilterOpen);
  filtersClose.addEventListener('click', removeClassFilterOpen);


  // Отображение тегов фильтра
  const mobileWidth = window.matchMedia('(max-width: 1000px)');

  const checkboxList = Array.from(filters.querySelectorAll('input[type="checkbox"]')); // Все чекбоксы
  const filtersActions = filters.querySelector('.filters__actions'); // Блок кнопок "Сбросить" и "Применить"
  const vacanciesFilterContent = vacancies.querySelector('.vacancies-filter-content'); // Блок списка тегов фильтра и кнопки "Сбросить"
  const vacanciesFilterContentList = vacanciesFilterContent.querySelector('.vacancies-filter-content__list'); // ul для тегов фильтра

  const addClassFilterVisible = () => vacanciesFilterContent.classList.add('js-filter-visible');
  const removeClassFilterVisible = () => {
    vacanciesFilterContent.classList.remove('js-filter-visible');
    vacanciesFilterContent.querySelector('.vacancies-filter-content__list').replaceChildren();
  };


  function addTagFilter (checkbox) {
    const li = document.createElement('li');
    li.classList.add('vacancies-filter-content__item');
    const filterDelete = document.createElement('button');
    li.textContent = checkbox.value;
    filterDelete.classList.add('vacancies-filter-content__delete');
    li.appendChild(filterDelete);

    vacanciesFilterContentList.appendChild(li);

    filterDelete.addEventListener('click', () => {
      li.remove();
      checkbox.checked = false;

      const isEmptyFilter = vacanciesFilterContentList.children.length === 0;
      if (isEmptyFilter) removeClassFilterVisible();
    });
  };

  const checkboxInnerWrappers = vacancies.querySelectorAll('.filter__item-inner');
  checkboxInnerWrappers.forEach(checkboxInnerWrapper => {
    const checkboxInnerList = checkboxInnerWrapper.querySelectorAll('input[type="checkbox"]');


    // Сброс фильтра и удаление тегов фильтра по нажатию на кнопку
    function doResetFilter () {
      const resetFilterBtns = vacancies.querySelectorAll('.vacancies-filter-content__reset, .filters__actions-reset');
      resetFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          checkboxList.forEach(checkbox => checkbox.checked = false);
          removeClassFilterVisible();
        })
      });
    };


    // Действия с каждый чекбоксом
    function checkboxActions (checkbox) {

      // Отмечен ли хотя бы один чекбокс
      const isSomeChecked = checkboxList.some(item => item.checked);

      const isCheckedInner = Array.from(checkboxInnerList).some(checkboxInner => checkboxInner.checked === true);

      if (isSomeChecked && mobileWidth.matches) {
        filtersActions.classList.add('js-filter-active');
      } else {
        filtersActions.classList.remove('js-filter-active');
      }

      const mainCheckbox =  checkbox.closest('.filter__item-inner')?.closest('.filter__item').querySelector('input[type="checkbox"]')
        //const checkboxesInner = checkbox.parentNode.querySelectorAll('.filter__item-inner input[type="checkbox"]');

      if (checkbox.checked) {
        addTagFilter(checkbox);
        if (mainCheckbox && isCheckedInner) {
          mainCheckbox.checked = true;
          addTagFilter(mainCheckbox);
        }

        // if (checkboxesInner) checkboxesInner.forEach(checkbox => {
        //   checkbox.checked = true
        //   addTagFilter(checkbox);
        // });

      } else {
        const checkedItems = vacanciesFilterContentList.querySelectorAll('li');
        checkedItems.forEach(checkedItem => {
          if (checkedItem.textContent === checkbox.value) checkedItem.remove();
        })
        if (mainCheckbox && !isCheckedInner) mainCheckbox.checked = false;
        //if (checkboxesInner) checkboxesInner.forEach(checkbox => checkbox.checked = false);

        if (!checkboxList.some(checkbox => checkbox.checked)) removeClassFilterVisible();

      }

      isSomeChecked ? addClassFilterVisible() : removeClassFilterVisible();

      doResetFilter();

    };


    checkboxList.forEach(checkbox => checkbox.addEventListener('change', () => {
      checkboxActions(checkbox);
    } ));

    })
  }
















