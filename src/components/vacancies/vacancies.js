const vacancies = document.querySelector('.vacancies');

if (vacancies) {

  function addClassFilterActive (items) {
    items.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('js-filter-active')
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

  const addClassFilterOpen = () => filters.classList.add('js-filter-open');
  const removeClassFilterOpen = () => filters.classList.remove('js-filter-open');

  filterSettingBtn.addEventListener('click', addClassFilterOpen);
  filtersClose.addEventListener('click', removeClassFilterOpen);



  // Отображение тегов фильтра

  const mobileWidth = window.matchMedia('(max-width: 1000px)');

  const checkboxList = Array.from(filters.querySelectorAll('input[type="checkbox"]'));
  const filtersActions = filters.querySelector('.filters__actions');
  const vacanciesFilterContent = vacancies.querySelector('.vacancies-filter-content');
  const vacanciesFilterContentList = vacanciesFilterContent.querySelector('.vacancies-filter-content__list');

    checkboxList.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        const isChecked = checkboxList.some(item => item.checked);
        const checkedItems = vacanciesFilterContentList.querySelectorAll('li');

        if (isChecked && mobileWidth.matches) {
          filtersActions.classList.add('js-filter-active');
        } else filtersActions.classList.remove('js-filter-active');

        if (checkbox.checked) {
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
          });
        } else {
          checkedItems.forEach(checkedItem => {
            if (checkedItem.textContent === checkbox.value) checkedItem.remove();
          })
        }

        if (isChecked) {
          vacanciesFilterContent.classList.add('js-filter-visible');
        } else {
          vacanciesFilterContent.classList.remove('js-filter-visible');
        }

      const resetFilterBtns = vacancies.querySelectorAll('.vacancies-filter-content__reset');
        resetFilterBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            checkboxList.forEach(checkbox => checkbox.checked = false);
            vacanciesFilterContent.classList.remove('js-filter-visible');
            vacanciesFilterContent.querySelector('.vacancies-filter-content__list').replaceChildren();
          })
        });


        const checkboxInnerWrappers = vacancies.querySelectorAll('.filter__item-inner');
        checkboxInnerWrappers.forEach(checkboxInnerWrapper => {
          const checkboxInnerList = checkboxInnerWrapper.querySelectorAll('input[type="checkbox"]');
          const titleCheckbox = checkboxInnerWrapper.closest('.filter__item')
                                                    .querySelector('input[type="checkbox"]');





        });



      });
    })


  }
















