{
  // все кнопки, по нажатию на которые появляется поп-ап
  const callToActionButtons = document.querySelectorAll('.button-popup');


  const API_URL = 'https://httpbin.org/post!';

  let replyPopup;
  let formPopup;


  function removeFormPopup () {
    const formPopup = document.querySelector('.form-popup');
    if (formPopup) formPopup.remove();
  };

  function closeFormPopup (popup) {
    popup.remove();
    unblockScrollBody();
    popup.querySelector('form').reset();
  };

  function openFormPopup (popup) {
    const template = document.querySelector('#form-popup').content.cloneNode(true);
    popup = template.querySelector('.form-popup')
    document.body.append(popup);
    blockScrollBody();
    onDocumentClick(popup);

    // close
    const close = popup.querySelector('.form-popup__close');
    close.addEventListener('click', () => closeFormPopup(popup));

    InputDrop();
    addFileInput()
  };

  function onDocumentClick (item) {
    document.body.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('form-popup')) closeFormPopup(item);
    })
  };

  if (callToActionButtons) {

    callToActionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        openFormPopup(formPopup);
        const phoneInputs = document.querySelectorAll('input[data-tel-input]');
        const forms = document.querySelectorAll('.form-popup__item');

        if (phoneInputs) validInputTel(phoneInputs);
        if (forms) validForm(forms);
        userFormSubmit();


        if (forms) {
          const tabsForm = document.querySelectorAll('.form-popup__button-change')
          const smallForm = document.querySelector('.form-popup__item--small');
          const fullForm = document.querySelector('.form-popup__item--full');

          const activeForm = (form) => form.classList.add('js-active-form');
          const inActiveForm = (form) => form.classList.remove('js-active-form');


          // Сделать активной изначально сокращенную форму
          function formSmallActive () {
            activeForm(smallForm);
            inActiveForm(fullForm);
            tabsForm.forEach(tab => tab.classList.remove('js-type-active'));
            tabsForm[0].classList.add('js-type-active');
          };

          // Сделать активной изначально полую форму
          function formFullActive () {
            activeForm(fullForm);
            inActiveForm(smallForm);
            tabsForm.forEach(tab => tab.classList.remove('js-type-active'));
            tabsForm[1].classList.add('js-type-active');
          };

          formSmallActive();


          function switchTypeForm (evt) {
            inActiveForm(smallForm);
            inActiveForm(fullForm);

            const dataType = evt.target.dataset.type;
            if (dataType === 'small') {
              activeForm(smallForm);
              inActiveForm(fullForm);
            }
            if (dataType === 'full') {
              activeForm(fullForm);
              inActiveForm(smallForm);
            }
          };


          tabsForm.forEach(tab => {

            const forms = tab.closest('.form-popup__content').querySelectorAll('.form-popup__item');
            forms.forEach( (form) => {
              if (form.dataset.popup === tab.dataset.popup) tab.classList.add('js-type-active');
            });

            tab.addEventListener('click', (evt) => {
              tabsForm.forEach(item => item.classList.remove('js-type-active'));
              evt.target.classList.add('js-type-active');
              switchTypeForm(evt);
            } );
          });


          // Функция выбора вакансии в поп-апе при клике на вакансию
          function selectedVacancy (titleVacancy) {
            formFullActive();
            const vacancyListForm = fullForm.querySelectorAll('.form__input-vacancy option');
            vacancyListForm.forEach(vacancyItem => {
              if (vacancyItem.textContent === titleVacancy) {
                vacancyItem.selected = true;
                vacancyListForm.forEach(vacancy => {
                  if (vacancy !== vacancyItem) vacancy.disabled = true;
                })
              }
            });
          };
          // Выбор вакансии в поп-апе на странице вакансий
          if (btn.classList.contains('vacancies-button')) {
            const titleVacancy = btn.closest('.vacancies-item')
              .querySelector('.vacancies-item__title').textContent;
            selectedVacancy(titleVacancy);
          };


          // Выбор вакансии в поп-апе на внутренней странице вакансии
          if (btn.classList.contains('vacancy-hr__button')) {
            const titleVacancy = document.querySelector('.vacancy__title').textContent;
            selectedVacancy(titleVacancy);
          };

        }

      });
    });
  }





// --- reply-popup (ответ на отправленную форму) ------

  function closeReplyPopup (replyPopup) {
    replyPopup.remove();
    unblockScrollBody();
  };

  function showReplyPopup () {
    document.body.append(replyPopup);
    const closeButtons = replyPopup.querySelectorAll('.reply-popup__button, .reply-popup__close');
    closeButtons.forEach(closeButton => {
      closeButton.addEventListener('click', () => closeReplyPopup(replyPopup))
    })
    document.body.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('reply-popup')) closeReplyPopup(replyPopup);
    })
  };

  function displayReplyPopupSuccess () {
    const template = document.querySelector('#success').content.cloneNode(true);
    replyPopup = template.querySelector('.reply-popup');
    showReplyPopup();
  };

  function displayReplyPopupError () {
    const template = document.querySelector('#error').content.cloneNode(true);
    replyPopup = template.querySelector('.reply-popup');
    showReplyPopup();
  }


  function sendDataForm (onSuccess, onError, body) {
    fetch(API_URL,{
        method: 'POST',
        body,
      },
    ).then((response) => {
      response.ok ? onSuccess() : onError();
    }).catch(() => onError());
  };

  function userFormSubmit () {

    const forms = document.querySelectorAll('form')

    forms.forEach(form => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const isValid = form.checkValidity();

        if (isValid) {
          sendDataForm(() => {
              displayReplyPopupSuccess();
              removeFormPopup();
              form.reset();
            },
            () => {
              displayReplyPopupError();
              removeFormPopup();
            },
            new FormData(evt.target)
          );
        }
      });
    })
  };


  userFormSubmit();








}
