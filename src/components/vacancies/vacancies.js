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

  const addClassFilterVisible = () => {
    if (!vacanciesFilterContent.classList.contains('js-filter-visible')) {
      vacanciesFilterContent.classList.add('js-filter-visible');
    }
  }
  const removeClassFilterVisible = () => {
    vacanciesFilterContent.classList.remove('js-filter-visible');
    vacanciesFilterContent.querySelector('.vacancies-filter-content__list').replaceChildren();
  };

  let checkedCheckboxes = []; // Изменяемый массив, куда мы добавляем значения тегов фильтра без повторных элементов


  function addTagFilter (checkbox) {
    const li = document.createElement('li');
    li.classList.add('vacancies-filter-content__item');
    const filterDelete = document.createElement('button');
    li.textContent = checkbox.value;
    filterDelete.classList.add('vacancies-filter-content__delete');
    li.appendChild(filterDelete);

    vacanciesFilterContentList.appendChild(li);

    if (checkbox.dataset.type === "main") {
      li.dataset.type = 'main';
    }

    const checkboxesInner = checkbox.parentNode.querySelectorAll('.filter__item-inner input[type="checkbox"]');

      filterDelete.addEventListener('click', () => {
      li.remove();
      checkbox.checked = false;

      if (checkedCheckboxes.includes(li.textContent)) {
        checkedCheckboxes = checkedCheckboxes.filter(el => el !== li.textContent);
      }

        const checkedItems = vacanciesFilterContentList.querySelectorAll('li');

      if (li.dataset.type === "main" && checkboxesInner) {

        checkboxesInner.forEach(checkboxInner => {
          checkboxInner.checked = false;
          checkedCheckboxes = checkedCheckboxes.filter(el => el !== checkboxInner.value);

          checkedItems.forEach(checkedItem => {
            if (checkedItem.textContent === checkboxInner.value) {
              checkedItem.remove();
            }
          });
        });
      };

      const checkboxInnerList = checkbox.closest('.filter__item-inner')?.querySelectorAll('input[type="checkbox"]:checked') ;
      if (checkboxInnerList && checkboxInnerList.length === 0) {

        const mainCheckbox =  checkbox.closest('.filter__item-inner')?.closest('.filter__item').querySelector('input[type="checkbox"]');

        checkedItems.forEach(checkedItem => {
          if (checkedItem.textContent === mainCheckbox.value) {
            checkedItem.remove();
            mainCheckbox.checked = false;
          }
        });
      }





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
              checkedCheckboxes.push(checkboxInner.value)
            }
          })
        };
      }
      else {
        checkedCheckboxes = checkedCheckboxes.filter(value => value !== checkbox.value)
        const checkedItems = vacanciesFilterContentList.querySelectorAll('li');
        checkedItems.forEach(checkedItem => {
            if (checkedItem.textContent === checkbox.value) checkedItem.remove();
          }
        );

        if (!isCheckedInner && mainCheckbox) {
          if(checkCheckboxState(mainCheckbox.value)){
            mainCheckbox.checked = false;
            checkedCheckboxes = checkedCheckboxes.filter(value =>value !== mainCheckbox.value);

            checkedItems.forEach(checkedItem => {
              if (checkedItem.textContent === mainCheckbox.value) checkedItem.remove();
            })

          }
        }

        // Если чекбокс является главным (т.е. имеет вложенные чекбоксы)
        if (checkbox.dataset.type === 'main') {
          checkboxesInner.forEach(checkboxInner => {
            checkedCheckboxes = checkedCheckboxes.filter(value =>value !== checkboxInner.value);

            checkedItems.forEach(checkedItem => {
              if (checkedItem.textContent === checkboxInner.value) checkedItem.remove();
            })
          });
        }

        if (checkboxesInner) {
          checkboxesInner.forEach(checkboxInner => {
            checkboxInner.checked = false;
            checkedCheckboxes = checkedCheckboxes.filter(value =>value !== checkboxInner.value);
          });
        }

        if (!checkboxList.some(checkbox => checkbox.checked)) removeClassFilterVisible();
      }

      isSomeChecked ? addClassFilterVisible() : removeClassFilterVisible();

      checkedCheckboxes.length !== 0 ? addClassFilterVisible() : removeClassFilterVisible();


      //console.log(checkedCheckboxes)
      doResetFilter();

    };


    checkboxList.forEach(checkbox => checkbox.addEventListener('change', () => checkboxActions(checkbox)));

  })
}
















