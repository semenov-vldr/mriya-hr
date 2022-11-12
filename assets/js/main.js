
{
  const data = {
    // класс для всего блока, в котором мы работаем
    classWrapper: '.areas',
    // класс контента, который будет меняться
    classImg: '.areas__images img',
    // класс текста, который будет меняться
    classText: '.areas__description',
    // класс табов
    classNav: '.areas__item',
    // имя активного класса
    activeClass: 'js-area-active',
    // data-атрибут для табов
    dataNameNav: 'data-area',
    // data-атрибут для фото
    dataNameImg: 'data-image',
    dataNameText: 'data-description'
  }

  selectAreas(data)

  function selectAreas ( { classWrapper, classImg, classText, classNav, activeClass,  dataNameNav, dataNameImg, dataNameText} ) {

    const blockWrapper = document.querySelector(classWrapper);

    if (blockWrapper) {

      const images = blockWrapper.querySelectorAll(classImg);
      const texts = blockWrapper.querySelectorAll(classText);
      const tabs = blockWrapper.querySelectorAll(classNav);

      const addClassActive = (item) => item.classList.add(activeClass);
      const removeClassActive = (item) => item.classList.remove(activeClass);

      addClassActive(images[0]);
      addClassActive(texts[0]);
      addClassActive(tabs[0]);


      tabs.forEach(tab => {
        tab.addEventListener('click', function() {
          images.forEach(removeClassActive);
          texts.forEach(removeClassActive);
          tabs.forEach(removeClassActive);

          addClassActive(tab);
          const numberTab = tab.getAttribute(dataNameNav);
          images.forEach(image => {
            const numberImg = image.getAttribute(dataNameImg);
            if (numberTab === numberImg) addClassActive(image);
          });
          texts.forEach(text => {
            const numberImg = text.getAttribute(dataNameText);
            if (numberTab === numberImg) addClassActive(text);
          });

        });
      });

    }

  };


}

const areas = document.querySelector('.areas');

if (areas) {
  const showMore = areas.querySelector('.areas__item--more');

  const startItems = 8;

  const areasItems = areas.querySelectorAll('.areas__item');
  const areasItemsLength = areasItems.length;

  showMore.textContent = `+${areasItemsLength - startItems}`;

  showMore.addEventListener('click', () => {
    areasItems.forEach(el => el.classList.add('js-visible'));
    showMore.classList.add('hidden');
  })

  if (areasItemsLength < startItems + 1) showMore.classList.add('hidden');


}

// document.addEventListener('DOMContentLoaded', animationSteps);
//
//
// function animationSteps () {
//   const employment = document.querySelector('.employment');
//   if (employment) {
//     const stepNumbers = employment.querySelectorAll('.employment-steps-item__number');
//
//   }
// }

const employment = document.querySelector('.employment');

if (employment) {

  const stepNumbers = employment.querySelectorAll('.employment-steps-item__number');
  const line = employment.querySelector('.employment-steps__line--dark');

  const options = {
    rootMargin: '0px 0px -20%',
    threshold: 1
  };


  const observerStep = new IntersectionObserver(callbackStep, options)
  const observerLine = new IntersectionObserver(callbackLine, options)

  function callbackStep (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-center')
      }
      else {
        entry.target.classList.remove('scroll-center')
      }
    })
  };




  function callbackLine (entries) {
    entries.forEach((entry) => {
      const el = entry.target;

      if (entry.isIntersecting) {
        const startPosition = window.scrollY;

        function setHeightLine () {
          let value = window.scrollY - startPosition;
          el.style.height = `${value}px`;
        };

        window.addEventListener('scroll', setHeightLine)
    }
  })
  };

  stepNumbers.forEach(stepNum => observerStep.observe(stepNum));
  observerLine.observe(line);




}



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

          activeForm(smallForm);

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
            tab.addEventListener('click', (evt) => switchTypeForm(evt))
          });
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
    ).then((responce) => {
      responce.ok ? onSuccess() : onError();
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

const phoneInputs = document.querySelectorAll('input[data-tel-input]');

function validInputTel (phoneInputs) {

  const getInputNumbersValue = (input) => {
    return input.value.replace(/\D/g,"");
  };

  const onPhoneInput = (evt) => {
    const input = evt.target;
    let inputNumbersValue = getInputNumbersValue(input);
    let formattedInputValue = "";
    let selectionStart = input.selectionStart;

    if ( !inputNumbersValue ) input.value = "";

    if ( input.value.length !== selectionStart ) {
      if ( evt.data && /\D/g.test(evt.data) ) {
        input.value = formattedInputValue;
      }
      return;
    }

    if ( ["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1 ) {
      // Российские номера
      if (inputNumbersValue[0] === "9") inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = (inputNumbersValue[0] === "8") ? "8" : "+7";
      formattedInputValue = firstSymbols + " ";

      {
        if (inputNumbersValue[0] === "8") {
          phoneInputs.forEach(phoneInput => phoneInput.setAttribute("pattern", ".{17,}") )
        } else {
          phoneInputs.forEach(phoneInput => phoneInput.setAttribute("pattern", ".{18,}") )
        }
      }



      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.slice(1, 4);
      }

      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.slice(4, 7);
      }

      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.slice(7, 9);
      }

      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.slice(9, 11);
      }

// Не российские номера
    } else formattedInputValue = "+" + inputNumbersValue;

    input.value = formattedInputValue;
  };

// Стирание первого символа
  const onPhoneKeyDown = (evt) => {
    const input = evt.target;
    if (evt.keyCode === 8 && getInputNumbersValue(input).length === 1) {
      input.value = "";
    }
  };

// Вставка цифр в любое место
  const onPhonePaste = (evt) => {
    const pasted = evt.clipboardData || window.clipboardData;
    const input = evt.target;
    const inputNumbersValue = getInputNumbersValue(input);

    if (pasted) {
      const pastedText = pasted.getData("Text");
      if ( /\D/g.test(pastedText) ) {
        input.value = inputNumbersValue;
      }
    }
  };

  phoneInputs.forEach(phoneInput => {
    phoneInput.addEventListener('input', onPhoneInput);
    phoneInput.addEventListener("keydown", onPhoneKeyDown);
    phoneInput.addEventListener("paste", onPhonePaste);
  });
}


if (phoneInputs) validInputTel(phoneInputs);



function InputDrop () {

  const dropZoneList = document.querySelectorAll('.form-upload');

if (dropZoneList) {
  dropZoneList.forEach(dropZone => {

  // массив событий
  const events = ['dragenter', 'dragleave', 'dragover', 'drop'];

  // сброс дефолтных событий
  function preventDefaults(evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  // сброс стилей для всех событий в dropZone
  events.forEach(event => {
    dropZone.addEventListener(event, preventDefaults);
  });

  // Подсветка dropZone
  function highLight() {
    dropZone.classList.add('highlight');
  };

  // Снять подсветку dropZone
  function unHighLight() {
    dropZone.classList.remove('highlight');
  };

  // Добавить подсветку при событиях 'dragenter', 'dragover'
  ['dragenter', 'dragover'].forEach(event => {
    dropZone.addEventListener(event, highLight);
  });

  // Убрать подсветку при событиях 'dragleave', 'drop'
  ['dragleave', 'drop'].forEach(event => {
    dropZone.addEventListener(event, unHighLight);
  });


  // Обработчик файлов, добавленных через проводник
  function handleFiles(files) {
    files = [...files];
    console.log(files)
    const names = new Set(files)
    files.forEach(uploadFile);
    files.forEach(showFileName);
  };


  // Обработчик файлов, добавленных через событие drop
  function handleDrop(evt) {
    let dt = evt.dataTransfer;
    let files = dt.files;
    handleFiles(files);
  };

    function uploadFile(file) {
      let url = 'URL для загрузки файлов';
      let formData = new FormData();

      formData.append('file', file);

      fetch(url, {
        method: 'POST',
        body: formData
      })
        .then(() => {
          console.log('отправка успешна');
        })
        .catch(() => console.log('Ошибка'))
    };

    dropZone.addEventListener('drop', handleDrop);

  })
  }
};

function showFileName (file) {
  const name = document.createElement('p');
  name.classList.add('form-upload__file-name')
  name.style.color = "#969696";
  name.textContent = `Файл "${file.name}" добавлен`;
  const parent = document.querySelector('.form-upload');
  parent.appendChild(name);
};


function addFileInput () {

  const inputFile = document.querySelector('.form-upload__input');
  if (inputFile) {

    const changeHandler = (evt) => {
      if (!evt.target.files.length) return
      const files = Array.from(evt.target.files);
      files.forEach(file => showFileName(file, inputFile));
    };

    inputFile.addEventListener('change', (evt) => {
      changeHandler(evt);
    });
  }
}








//----------- валидация обязательных полей -----------------

const forms = document.querySelectorAll('.form-popup__item');


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

if (forms) validForm(forms)


const header = document.querySelector('.header');
const headerNav = header.querySelector('.header__nav');
const page = document.querySelector('.page');

if (headerNav) {
  const burger = header.querySelector('.header__burger');
  burger.addEventListener('click', () => {
    headerNav.classList.toggle('js-active-menu')
   page.classList.toggle('js-block-scroll');
    burger.classList.toggle('js-active-menu')
  })
}



const plus = document.querySelector('.plus');

if (plus) {

  const plusTabs = document.querySelectorAll('.plus-tabs__item');
  plusTabs.forEach(tab => {
   plusTabs[0].classList.add('js-tabs-active');
    tab.addEventListener('click', () => {
      plusTabs.forEach(tab => tab.classList.remove('js-tabs-active') );
      tab.classList.add('js-tabs-active');
    })
  })


  {
    const data = {
      // класс для всего блока, в котором мы работаем
      classWrapper: '.advantages',
      // класс контента, который будет меняться
      classSlide: '.advantages__images-item',
      // класс табов
      classNav: '.accordion__item',
      // имя активного класса
      activeClass: 'js-advantages-active',
      // data-атрибут для табов
      dataNameNav: 'data-advant',
      // data-атрибут для слайда
      dataNameSlide: 'data-image',
    }

    tabsSlides(data)
  }

  {
    const data = {
      // класс для всего блока, в котором мы работаем
      classWrapper: '.plus',
      // класс контента, который будет меняться
      classSlide: '.plus__content',
      // класс табов
      classNav: '.plus-tabs__item',
      // имя активного класса
      activeClass: 'js-plus-active',
      // data-атрибут для табов
      dataNameNav: 'data-tab',
      // data-атрибут для слайда
      dataNameSlide: 'data-content',
    }

    tabsSlides(data)
  }








}


{

  //const mobileWidth = window.matchMedia('(max-width: 768px)').matches;

  let mySwiper;

  const swiperList = document.querySelectorAll('.swiper');

  swiperList.forEach(swiper => {

    mySwiper = new Swiper(swiper, {
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      navigation: {
        nextEl: '.slider-nav__next',
        prevEl: '.slider-nav__prev',
      },

      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },

      uniqueNavElements: true,

      slidesPerView: 4,

      // Бесконечная прокрутка
      //loop: true,

      // Откл функционала, если слайдов меньше, чем нужно
      watchOverflow: true,

      //centeredSlides: true,

      // Отступ между слайдами
      spaceBetween: 24,

      // Стартовый слайд
      initialSlide: 0,

      // Брейк поинты (адаптив)
      // Ширина экрана
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 16,
        },

        480: {
          slidesPerView: 2,
          spaceBetween: 20,
        },

        768: {
          slidesPerView: 3
        },

        1100: {
          slidesPerView: 4
        },

      }
    });

  })







}


const stories = document.querySelector('.stories');

if (stories) {

  const openStoriesBtn = document.querySelector('.open-stories');
  if (openStoriesBtn) {
    openStoriesBtn.addEventListener('click', openStories);
  }

  const close = stories.querySelector('.stories__close');
  close.addEventListener('click', closeStories);

  function closeStories () {
    stories.classList.remove('js-stories-active')
  }

  function openStories () {
    stories.classList.add('js-stories-active');
    runInterval(5, 1);
  }


  const timelineItems = stories.querySelectorAll('.stories-timeline__item');
  timelineItems[0].classList.add('js-timeline-active');

  const storiesContentItems = stories.querySelectorAll('.stories-content__item');
  storiesContentItems[0].classList.add('js-stories-content-active');


  function moveClass(activeClass, method, predicate) {
    const activeEl = stories.querySelector('.' + activeClass);
    const switchEl = activeEl[method];

    if ( predicate && !predicate(activeEl) ) return null;

    if (switchEl) {
      activeEl.classList.remove(activeClass);
      switchEl.classList.add(activeClass);
      return activeEl;
    }
    return null;
  };

  function storiesSwitchPrev () {
      const prev = moveClass('js-timeline-active', 'previousElementSibling', (el) => {
      const inner = el.querySelector('.stories-timeline__item-inner');
      const width = parseFloat(inner.style.width) || 0;

      el.querySelector('.stories-timeline__item-inner').style.width = '';
      return width <= 20;
    });

    if (prev) moveClass( 'js-stories-content-active', 'previousElementSibling');
  };


  function storiesSwitchNext () {
    moveClass('js-stories-content-active', 'nextElementSibling');
    const el = moveClass('js-timeline-active', 'nextElementSibling');

    if (el) el.querySelector('.stories-timeline__item-inner').style.width = '';
  };


  const storiesPrev = stories.querySelector('.stories-content__switcher--prev');
  const storiesNext = stories.querySelector('.stories-content__switcher--next');
  storiesPrev.addEventListener('click', storiesSwitchPrev);
  storiesNext.addEventListener('click', storiesSwitchNext);


  // анимированное перекл слайдов
  let timer;

  function runInterval (time, step) {
    clearInterval(timer);

    timer = setInterval(() => {
      const activeEl = stories.querySelector('.js-timeline-active')
                              .querySelector('.stories-timeline__item-inner');
      const width = parseFloat(activeEl.style.width) || 0; // преобразование строки в число

      if(width === 100 ) {
        storiesSwitchNext();
        return;
      }

      activeEl.style.width = String(width + step) + '%';

    },time * 1000 * step / 100);
  };

}






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






function blockScrollBody () {
  document.body.classList.add('js-block-scroll');

}

function unblockScrollBody () {
  document.body.classList.remove('js-block-scroll');
}

function tabsSlides ( { classWrapper, classSlide, classNav, activeClass,  dataNameNav, dataNameSlide} ) {

  const blockWrapper = document.querySelector(classWrapper);

  if (blockWrapper) {

    const slides = blockWrapper.querySelectorAll(classSlide);
    const tabs = blockWrapper.querySelectorAll(classNav);

    const addClassActive = (item) => item.classList.add(activeClass);
    const removeClassActive = (item) => item.classList.remove(activeClass);

    addClassActive(tabs[0]);
    addClassActive(slides[0]);

    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(removeClassActive);
        slides.forEach(removeClassActive);
        addClassActive(tab);
        const numberTab = tab.getAttribute(dataNameNav);
        slides.forEach(slide => {
          const numberSlide = slide.getAttribute(dataNameSlide);
          if (numberTab === numberSlide) addClassActive(slide);
        });
      });
    });

  }

};
