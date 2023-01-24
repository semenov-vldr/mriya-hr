{




  const vacancies = document.querySelector('.vacancies');
  if (vacancies) {

  const uploadVacanciesBtn = vacancies.querySelector('.vacancies__more');

    uploadVacanciesBtn.addEventListener('click', () => {
      uploadVacanciesBtn.classList.add('js-upload');
      uploadVacanciesBtn.disabled = true;
    })




    // Поиск вакансий в поисковой строке
    // const vacanciesSearch = vacancies.querySelector('.vacancies-search__input');
    //
    // vacanciesSearch.addEventListener('keyup', searchJob);
    //
    // function searchJob() {
    //
    //   const inputValue = vacanciesSearch.value.toLowerCase();
    //   const vacanciesItems = vacancies.querySelectorAll('.vacancies__item');
    //
    //   vacanciesItems.forEach(vacancy => {
    //     const vacancyTitle = vacancy.querySelector('.vacancies-item__title').textContent;
    //
    //     if(vacancyTitle.toLowerCase().indexOf(inputValue) > -1) {
    //       vacancy.style.display = '';
    //     } else {
    //       vacancy.style.display = 'none';
    //     }
    //   })
    // }



  }


  // Счётчик вакансий
  const vacanciesList = document.querySelector('.vacancies__list');

  if (vacanciesList) {

    const countVacancies = document.querySelector('.filters__count-value');
    const amountVacancies = vacanciesList.querySelectorAll('.vacancies__item').length;

    if (amountVacancies < 10) {
      countVacancies.textContent = `00${amountVacancies}`;
    }

    if (amountVacancies >= 10 && amountVacancies < 100) {
      countVacancies.textContent = `0${amountVacancies}`;
    }

    if (amountVacancies > 100) {
      countVacancies.textContent = `${amountVacancies}`;
    }

  }





}
