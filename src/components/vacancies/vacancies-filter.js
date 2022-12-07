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

    showMore.addEventListener('click', (evt) => {
      filterItems.forEach(el => el.classList.toggle('js-visible'));
      showMore.classList.add('visually-hidden');
    })
  });


  // Показать фильтр на моб. версии по нажатию на кнопку

  const filterSettingBtn = vacancies.querySelector('.vacancies__filter-setting');
  const filters = vacancies.querySelector('.vacancies__filters');
  const filtersClose = filters.querySelector('.filters__close');

  const addClassFilterOpen = () => {
    filters.classList.add('js-filter-open');
    blockScrollBody();
  };
  const removeClassFilterOpen = () => {
    filters.classList.remove('js-filter-open');
    unblockScrollBody();
  };

  filterSettingBtn.addEventListener('click', addClassFilterOpen);
  filtersClose.addEventListener('click', removeClassFilterOpen);


  const mobileWidth = window.matchMedia('(max-width: 1000px)');

  const checkboxList = Array.from(filters.querySelectorAll('input[type="checkbox"]')); // Все чекбоксы
  const filtersActions = filters.querySelector('.filters__actions'); // Блок кнопок "Сбросить" и "Применить"
  const vacanciesFilterContent = vacancies.querySelector('.vacancies-filter-content'); // Блок списка тегов фильтра и кнопки "Сбросить"
  const vacanciesFilterContentList = vacanciesFilterContent.querySelector('.vacancies-filter-content__list'); // ul для тегов фильтра


  let checkedCheckboxes = []; // Изменяемый массив, куда мы добавляем значения тегов фильтра без повторных элементов


  // Отображение блока тегов фильтра
  const addClassFilterVisible = () => {
    if (!vacanciesFilterContent.classList.contains('js-filter-visible')) {
      vacanciesFilterContent.classList.add('js-filter-visible');
    }
  };
  // Скрытие блока тегов фильтра
  const removeClassFilterVisible = () => {
    vacanciesFilterContent.classList.remove('js-filter-visible');
    filtersActions.classList.remove('js-filter-active');
    vacanciesFilterContent.querySelector('.vacancies-filter-content__list').replaceChildren();
    checkedCheckboxes = [];
  };

  function removeSelectedTag (disabledCheckbox) {
    const checkedItems = vacanciesFilterContentList.querySelectorAll('li');
    checkedItems.forEach(checkedItem => {
      if (checkedItem.textContent === disabledCheckbox.value) {
        checkedItem.remove();
      }
    });
  };



  function tagFiltering (removedElement) {
    checkedCheckboxes = checkedCheckboxes.filter(el => el !== removedElement.value);
  };

  function removeTagFilter (li, checkbox) {
    li.remove();
    checkbox.checked = false;

    const checkboxesInner = checkbox.parentNode.querySelectorAll('.filter__item-inner input[type="checkbox"]');

    if (checkedCheckboxes.includes(li.textContent)) {
      checkedCheckboxes = checkedCheckboxes.filter(el => el !== li.textContent);
    }

    if (li.dataset.type === "main" && checkboxesInner) {
      checkboxesInner.forEach(checkboxInner => {
        checkboxInner.checked = false;
        tagFiltering(checkboxInner);
        removeSelectedTag(checkboxInner);
      });
    };

    const checkboxInnerList = checkbox.closest('.filter__item-inner')?.querySelectorAll('input[type="checkbox"]:checked') ;
    if (checkboxInnerList && checkboxInnerList.length === 0) {
      const mainCheckbox =  checkbox.closest('.filter__item-inner')?.closest('.filter__item').querySelector('input[type="checkbox"]');
      mainCheckbox.checked = false;
      removeSelectedTag(mainCheckbox);
      tagFiltering(mainCheckbox);
    }

    const isEmptyFilter = vacanciesFilterContentList.children.length === 0;
    if (isEmptyFilter) removeClassFilterVisible();
  }


  function addTagFilter (checkbox) {
    const li = document.createElement('li');
    li.classList.add('vacancies-filter-content__item');
    const filterDelete = document.createElement('button');
    li.textContent = checkbox.value;
    filterDelete.classList.add('vacancies-filter-content__delete');
    li.appendChild(filterDelete);

    vacanciesFilterContentList.appendChild(li);

    // Добавление data-атрибута тегу, если чекбокс имеет вложенность
    if (checkbox.dataset.type === "main") li.dataset.type = 'main';

    filterDelete.addEventListener('click', () => removeTagFilter(li, checkbox));
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



    const checkCheckboxState = (value) => {
      return checkedCheckboxes.includes(value)
    };

    // Действия с каждый чекбоксом
    function checkboxActions (checkbox) {

      // Отмечен ли хотя бы один чекбокс
      const isSomeChecked = checkboxList.some(item => item.checked);
      // Отмечен ли хотя бы один влоежнный чекбокс
      const isCheckedInner = Array.from(checkboxInnerList).some(checkboxInner => checkboxInner.checked === true);

      if (isSomeChecked && mobileWidth.matches) {
        filtersActions.classList.add('js-filter-active');
      } else {
        filtersActions.classList.remove('js-filter-active');
      }

      const mainCheckbox =  checkbox.closest('.filter__item-inner')?.closest('.filter__item').querySelector('input[type="checkbox"]');
      const checkboxesInner = checkbox.parentNode.querySelectorAll('.filter__item-inner input[type="checkbox"]');

      if (checkbox.checked) {
        if(!checkCheckboxState(checkbox.value)) {
          addTagFilter(checkbox);
          checkedCheckboxes.push(checkbox.value);
        }
        if (isCheckedInner && mainCheckbox) {
          if(!checkCheckboxState(mainCheckbox.value)){
            mainCheckbox.checked = true;
            addTagFilter(mainCheckbox);
            checkedCheckboxes.push(mainCheckbox.value);
          }
        }

        if (checkboxesInner) {
          checkboxesInner.forEach(checkboxInner => {
            checkboxInner.checked = true;
            if(!checkCheckboxState(checkboxInner.value)){
              addTagFilter(checkboxInner);
              checkedCheckboxes.push(checkboxInner.value);
            }
          })
        };
      }
      else {
        tagFiltering(checkbox);
        removeSelectedTag(checkbox);

        if (!isCheckedInner && mainCheckbox) {
          if(checkCheckboxState(mainCheckbox.value)){
            mainCheckbox.checked = false;
            tagFiltering(mainCheckbox)
            removeSelectedTag(mainCheckbox);
          }
        }

        // Если чекбокс является главным (т.е. имеет вложенные чекбоксы)
        if (checkbox.dataset.type === 'main' && checkboxesInner) {
          checkboxesInner.forEach(checkboxInner => {
            checkboxInner.checked = false;
            tagFiltering(checkboxInner)
            removeSelectedTag(checkboxInner);
          });
        }

        if (!checkboxList.some(checkbox => checkbox.checked)) removeClassFilterVisible();
      }

      isSomeChecked ? addClassFilterVisible() : removeClassFilterVisible();

      checkedCheckboxes.length !== 0 ? addClassFilterVisible() : removeClassFilterVisible();

      console.log(checkedCheckboxes)
      doResetFilter();

    };


    checkboxList.forEach(checkbox => checkbox.addEventListener('change', () => checkboxActions(checkbox)));

  })
}















