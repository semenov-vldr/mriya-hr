{

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
