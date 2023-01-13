

//----------- валидация обязательных полей -----------------

const forms = document.querySelectorAll('.form-popup__item');

if (forms) validForm(forms)


function validForm (forms) {

  const textError__name = 'Ошибка ввода';
  const textError__tel = 'Не менее 10 цифр';
  const textError__city = 'Ошибка ввода';
  const textError__date = 'Дата в формате дд.мм.гггг';


  const addClassHidden = (item) => item.classList.add('visually-hidden');
  const removeClassHidden = (item) => item.classList.remove('visually-hidden');


  forms.forEach(form => {

    const inputContainerList = form.querySelectorAll('.form__input-container');
    const errors = form.querySelectorAll('.form__error');
    errors.forEach(addClassHidden);

    inputContainerList.forEach(inputContainer => {

      const error = inputContainer.querySelector('.form__error');

      const inputItem = inputContainer.querySelector('input:not(.form-upload__input)');

      if (inputItem) {
        inputItem.addEventListener('input', () => {

          const isValid = inputItem.checkValidity();

          if (isValid || inputItem.value === '' ) {
            addClassHidden(error);
            error.textContent = '';

          } else {
            removeClassHidden(error);


            if (error.classList.contains('form__error--inputName')) {
              error.textContent = textError__name;
            }

            if (error.classList.contains('form__error--inputTel')) {
              error.textContent = textError__tel;
            }

            if (error.classList.contains('form__error--inputCity')) {
              error.textContent = textError__city;
            }

            if (error.classList.contains('form__error--inputDate')) {
              error.textContent = textError__date;
            }

          }
        })
      }
    });
  })
};



