{
  const vacancies = document.querySelector('.vacancies');

  if (vacancies) {

    const vacanciesSearch = vacancies.querySelector('.vacancies-search__input');

    vacanciesSearch.addEventListener('keyup', searchJob);

    function searchJob () {

      const inputValue = vacanciesSearch.value.toLowerCase();
      const vacanciesItems = vacancies.querySelectorAll('.vacancies__item');

      vacanciesItems.forEach(vacancy => {
        const vacancyTitle = vacancy.querySelector('.vacancies-item__title').textContent

        if(vacancyTitle.toLowerCase().indexOf(inputValue) > -1) {
          vacancy.style.display = '';
        } else {
          vacancy.style.display = 'none';
        }
      })
    }

  }




}
