
const blockAbout = document.querySelector('.about');

if (blockAbout) {

  //carousel-1
  {
    let myIndex = 0;
    carousel1 ();

    function carousel1 () {
      let images = blockAbout.querySelectorAll('.about__image:nth-child(1) img');

      if (images) {
        images.forEach(img => {
          img.style.opacity = "0"
        })
        myIndex++;
        if (myIndex > images.length) {myIndex = 1}

        images[myIndex-1].style.opacity = "1"

        setTimeout(carousel1, 5000)
      }
    }
  }


  //carousel-2
  {
    let myIndex = 0;

    setTimeout(carousel2, 3000)

    function carousel2 () {
      let images = blockAbout.querySelectorAll('.about__image:nth-child(2) img');

      if (images) {
        images.forEach(img => img.style.opacity = "0")

        myIndex++;

        if (myIndex > images.length) {myIndex = 1}
        images[myIndex-1].style.opacity = "1"

        setTimeout(carousel2, 5000)
      }
    }
  }

}

{

  let mySwiper;

  //const swiperList = document.querySelectorAll('.about__swiper');

  //if (swiperList) createSwiper(swiperList);



  function createSwiper (swiperList) {
    swiperList.forEach(swiper => {

      mySwiper = new Swiper(swiper, {

        uniqueNavElements: true,

        slidesPerView: 1,

        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },

        effect: "fade",

        // Бесконечная прокрутка
        //loop: true,

        // Откл функционала, если слайдов меньше, чем нужно
        //watchOverflow: true,

        //centeredSlides: true,

        // Отступ между слайдами
        spaceBetween: 24,

        // Стартовый слайд
        initialSlide: 0,


      });

    })
  };











}

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

const blog = document.querySelector('.blog');

if (blog) {
  const showMore = blog.querySelector('.blog__theme-item--btn-more');

  const startItems = 8;

  const blogItems = blog.querySelectorAll('.blog__theme-item');
  const blogItemsLength = blogItems.length;

  showMore.textContent = `+ ${blogItemsLength - startItems}`;

  showMore.addEventListener('click', () => {
    blogItems.forEach(el => el.classList.add('js-visible'));
    showMore.classList.add('hidden');
  })

  if (blogItemsLength < startItems + 1) showMore.classList.add('hidden');

}

{

  const employment = document.querySelector('.employment');

  const desktopWidth = window.matchMedia('(min-width: 1001px)').matches;

  if (employment && desktopWidth) ImagesChangeFade ();


  function ImagesChangeFade () {

    const employmentSteps = document.querySelectorAll('.employment-steps__item');
    const images = employment.querySelectorAll('.employment__images img');

    images.forEach(img => img.classList.add('js-hidden'));
    employmentSteps.forEach(step => step.classList.remove('js-step-active'));

    images[0].classList.remove('js-hidden');
    employmentSteps[0].classList.add('js-step-active');

    employmentSteps.forEach((step, indexStep) => {
      step.addEventListener('click', () => {
        images.forEach(img => img.classList.add('js-hidden'));
        employmentSteps.forEach(step => step.classList.remove('js-step-active'));

        step.classList.add('js-step-active');
        images[indexStep].classList.remove('js-hidden');
      })
    })



  }



}

{
  // все кнопки, по нажатию на которые появляется поп-ап
  const callToActionButtons = document.querySelectorAll('.button-popup, .button-popup-ask');


  const API_URL = 'https://httpbin.org/post';

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

    const header = document.querySelector('.header');
    if (header.classList.contains('js-active-menu')) {
      header.classList.remove('js-active-menu');
    }
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
    addFileInput();
  };

  function openFormPopup__Ask (popup) {
    const template = document.querySelector('#form-popup--ask').content.cloneNode(true);
    popup = template.querySelector('.form-popup')
    document.body.append(popup);
    blockScrollBody();
    onDocumentClick(popup);
    // close
    const close = popup.querySelector('.form-popup__close');
    close.addEventListener('click', () => closeFormPopup(popup));

    InputDrop();
    addFileInput();
  };



  function onDocumentClick (item) {
    document.body.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('form-popup')) closeFormPopup(item);
    })
  };

  if (callToActionButtons) {

    callToActionButtons.forEach(btn => {
      btn.addEventListener('click', () => {

        (btn.classList.contains('button-popup-ask')) ? openFormPopup__Ask(formPopup) : openFormPopup(formPopup);

        const phoneInputs = document.querySelectorAll('input[data-tel-input]');
        const dateInputs = document.querySelectorAll('input[name="date"]');
        const forms = document.querySelectorAll('.form-popup__item');

        if (phoneInputs) validInputTel(phoneInputs);

        if (dateInputs) maskDate(dateInputs);

        if (forms) validForm(forms);
        userFormSubmit();

        if (forms) {
          const fullForm = document.querySelector('.form-popup__item--full');

          // Функция выбора вакансии в поп-апе при клике на вакансию
          function selectedVacancy (titleVacancy) {
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
            const titleVacancy = btn.closest('.vacancies__item')
              .querySelector('.vacancies-item__title').textContent;
            selectedVacancy(titleVacancy);
          };


          // Выбор вакансии в поп-апе на внутренней странице вакансии
          if (btn.classList.contains('vacancy-hr__button')) {
            const titleVacancy = document.querySelector('h1').textContent;
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

const dateInputList = document.querySelectorAll('input[name="date"]');

if (dateInputList) maskDate(dateInputList)

function maskDate (dateInputList) {

  dateInputList.forEach(dateInput => {
    Inputmask({"mask": "99.99.9999"}).mask(dateInput);
  })

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
      //let firstSymbols = (inputNumbersValue[0] === "8") ? "8" : "+7";
      let firstSymbols = (inputNumbersValue[0] === "8") ? "+7" : "+7";
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


const MAXSIZEFILE = 1024*1024*15;

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
  events.forEach(event => dropZone.addEventListener(event, preventDefaults));

  // Подсветка dropZone
  const highLight = () => dropZone.classList.add('highlight');
  // Снять подсветку dropZone
  const unHighLight = () => dropZone.classList.remove('highlight');

  // Добавить подсветку при событиях 'dragenter', 'dragover'
  ['dragenter', 'dragover'].forEach(event => dropZone.addEventListener(event, highLight));

  // Убрать подсветку при событиях 'dragleave', 'drop'
  ['dragleave', 'drop'].forEach(event => dropZone.addEventListener(event, unHighLight));


  function handleFiles(files) {
    files = [...files];
    files.forEach(file => {
      preloaderActive(dropZone, file);
      uploadFile(file);
    });
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
        .then(() => console.log('Файл успшно добавлен'))
        .catch(() => console.log('Ошибка'))
    };
    dropZone.addEventListener('drop', handleDrop);
  })
  }
};


function showFileName (file) {
  const name = document.createElement('p');
  name.classList.add('form-upload__file-name')
  name.textContent = `Файл "${file.name}" добавлен`;
  const parent = document.querySelector('.form-upload');
  parent.appendChild(name);
};


function preloaderActive (dropZone, file) {
  const reader = new FileReader();
  const spinner = dropZone.querySelector('.form-upload__spinner');

  if (file.size <= MAXSIZEFILE) {
    reader.addEventListener('progress', (evt) => {
      if (evt.loaded && evt.total) {
        const percent = (evt.loaded / evt.total) * 100;
        spinner.classList.add('js-spinner-active');
        if (percent === 100) spinner.classList.remove('js-spinner-active');
      }
    });
    reader.readAsDataURL(file);
    showFileName(file);

  } else alert('Размер файла превышен');


};


// Обработчик файлов, добавленных через проводник
function addFileInput () {
  const formUpload = document.querySelector('.form-upload');
  const inputFile = document.querySelector('.form-upload__input');
  if (inputFile) {

    const changeHandler = (evt) => {
      if (!evt.target.files.length) return
      const files = Array.from(evt.target.files);

      if (files) files.forEach(file => preloaderActive(formUpload, file));

    };

    inputFile.addEventListener('change', (evt) => changeHandler(evt));
    formUpload.addEventListener('click', () => inputFile.nextElementSibling.click());
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


const desktopWidth = window.matchMedia('(min-width: 1001px)');

let previousPosition = window.scrollTop || document.documentElement.scrollTop;

const header = document.querySelector('.header');
const burger = header.querySelector('.header__burger');

if (header && burger) {
  burger.addEventListener('click', () => {
    header.classList.toggle('js-active-menu');
    toggleScrollBody();
  });


  window.addEventListener('resize', () => {
    if (desktopWidth.matches) {
      header.classList.remove('js-active-menu');
      unblockScrollBody();
    }
  });


  const headerLinks = header.querySelectorAll('.header-nav__link, .header__logo');
  headerLinks.forEach(link => {
    const location = window.location.href;
    if (location === link.href) {
      link.classList.add('js-link-active');
      if (link.classList.contains('js-student-link')) {
        header.classList.add('js-student-page');

        burger.addEventListener('click', () => {
            header.classList.toggle('js-student-page');
        });

        window.addEventListener("scroll", () => {
          const currentPosition = window.scrollTop || document.documentElement.scrollTop;
          if ( previousPosition < currentPosition) {
            header.classList.add('js-scroll');
            header.classList.remove('js-student-page');
          }
          else {
            header.classList.remove('js-scroll');
            header.classList.add('js-student-page');
          }
        });

      }
      else {
        header.classList.remove('js-student-page');

        window.addEventListener("scroll", () => {
          const currentPosition = window.scrollTop || document.documentElement.scrollTop;
          ( previousPosition < currentPosition) ? header.classList.add('js-scroll') : header.classList.remove('js-scroll');
        });
      }
    }
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

  let mySwiper;

  const swiperList = document.querySelectorAll('.popular-vacancies__slider, .success__slider');

if (swiperList) createSwiper(swiperList);



function createSwiper (swiperList) {
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
          slidesPerView: 1.5,
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
};










}

const storiesList = document.querySelectorAll('.stories');

if (storiesList) storiesList.forEach(stories => storiesActive (stories));


 function storiesActive (stories) {

   const getVideoActive = () => stories.querySelector('.js-stories-content-active video');
   const getImageSlideActive = () => stories.querySelector('.js-stories-content-active.stories-content-item--image-text');

   const videoStoriesList = stories.querySelectorAll('video');
   videoStoriesList.forEach(video => video.setAttribute('playsinline', '') );

  const dataStories = stories.dataset.stories; // Значение 'data-stories' у блока stories
  const openStoriesBtnList = document.querySelectorAll(`[data-open-stories="${dataStories}"]`);

   openStoriesBtnList.forEach(openStoriesBtn => openStoriesBtn.addEventListener('click', openStories));

   const close = stories.querySelector('.stories__close');
   close.addEventListener('click', closeStories);


   // Timeline
   function createTimeline () {
     const timelineList = stories.querySelector('.stories-timeline');
     const amountTimeline = stories.querySelector('.stories-content').childElementCount;

     for (let i=1; i<=amountTimeline; i++) {
       const timeline = document.createElement('li');
       const timelineInner = document.createElement('div');
       timeline.classList.add('stories-timeline__item');
       timelineInner.classList.add('stories-timeline__item-inner');
       timeline.appendChild(timelineInner);
       timelineList.appendChild(timeline);
     }
   };
   createTimeline();

   // Установка длительности слайда и timeline
   function setIntervalContent() {
     const videoActive = getVideoActive();
     const imageSlideActive = getImageSlideActive();
     if (videoActive) {
       const duration = videoActive.duration;
       runInterval(duration);
     }
     if (imageSlideActive){
       runInterval(6);
     }
   };


   function openStories () {
     stories.classList.add('js-stories-active');
     blockScrollBody();
     const videoActive = getVideoActive();
     if (videoActive) {
       videoActive.play();
     }
       setIntervalContent();
   };


   function closeStories () {
     const videoList = stories.querySelectorAll('.stories-content__item video');
     videoList.forEach(video => {
       video.pause();
       video.currentTime = 0;
     });
     stories.classList.remove('js-stories-active');
     resetStories();
     unblockScrollBody();
   };

   // Закрытие по клику вне блока
   document.body.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('stories')) closeStories();
   });

   const activeTimeline = (timeline) => timeline.classList.add('js-timeline-active');
   const activeStoriesContent = (storiesContent) => storiesContent.classList.add('js-stories-content-active');
   const inActiveStoriesContent = (storiesContent) => storiesContent.classList.remove('js-stories-content-active');

   const timelineItems = stories.querySelectorAll('.stories-timeline__item');
   activeTimeline(timelineItems[0]);

   const storiesContentItems = stories.querySelectorAll('.stories-content__item');
   activeStoriesContent(storiesContentItems[0]);

   function resetStories () {
     timelineItems.forEach(activeTimeline);
     activeTimeline(timelineItems[0]);

     timelineItems.forEach(timeline => {
       let timelineInner = timeline.querySelector('.stories-timeline__item-inner');
       timelineInner.style.width = '';
     })
     storiesContentItems.forEach(inActiveStoriesContent);
     activeStoriesContent(storiesContentItems[0]);
   };

    // Перекл активности классов для слайдов и timeline
   function moveClass(activeClass, method, predicate) {
     const activeEl = stories.querySelector('.' + activeClass);
     const switchEl = activeEl[method];

     setIntervalContent();

     // Остановка предыдущего видео
     const videoPrev = activeEl.querySelector('.stories-content-item__video');
     if (videoPrev) {
       videoPrev.pause();
       videoPrev.currentTime = 0;
     };

     if ( predicate && !predicate(activeEl) ) return null;

     if (switchEl) {
       // Воспроизведение видео на переключенном слайде
       const videoActive = switchEl.querySelector('.stories-content-item__video');
       if (videoActive) videoActive.play();

       activeEl.classList.remove(activeClass);
       switchEl.classList.add(activeClass);
       setIntervalContent();
       return activeEl;
     } else {

       if (method === 'nextElementSibling') {
         closeStories()
       }
     }

     return null;
   };


   function storiesSwitchPrev () {
     const prev = moveClass('js-timeline-active', 'previousElementSibling', (el) => {
       const inner = el.querySelector('.stories-timeline__item-inner');
       const width = parseFloat(inner.style.width) || 0;
       inner.style.width = '';

       const videoPrev = stories.querySelector('.js-stories-content-active video');
       if (videoPrev) videoPrev.currentTime = 0;
       return width <= 20;
     });

     if (prev) moveClass( 'js-stories-content-active', 'previousElementSibling');
   };


   function storiesSwitchNext () {
     moveClass('js-stories-content-active', 'nextElementSibling');
     const el = moveClass('js-timeline-active', 'nextElementSibling');

     if (el) {
       el.querySelector('.stories-timeline__item-inner').style.width = '';
     }
   };

   const storiesPrev = stories.querySelector('.stories-content__switcher--prev');
   const storiesNext = stories.querySelector('.stories-content__switcher--next');
   storiesPrev.addEventListener('click', storiesSwitchPrev);
   storiesNext.addEventListener('click', storiesSwitchNext);


   // анимированная временная линия
   let timer;

   function runInterval (time) {
     clearInterval(timer);

     timer = setInterval(() => {
       const activeEl = stories.querySelector('.js-timeline-active .stories-timeline__item-inner');
       const width = parseFloat(activeEl.style.width) || 0; // преобразование строки в число

       const videoActive = getVideoActive();
       const imageSlideActive = getImageSlideActive();

      if (imageSlideActive || !videoActive.paused) {
        activeEl.style.width = String(width + 1) + '%';

        if (videoActive) {

          console.log(videoActive.networkState)
        }
      }






       if(width === 100 ) {storiesSwitchNext(); return;}

       //activeEl.style.width = String(width + step) + '%';


       if (!stories.classList.contains('js-stories-active')) clearInterval(timer);

     }, time * 1000 * 0.01);
   };

 };









{

  //const mobileWidth = window.matchMedia('(max-width: 768px)').matches;

  let mySwiper;

  const swiperList = document.querySelectorAll('.student-career-images__container');

  swiperList.forEach(swiper => {

    mySwiper = new Swiper(swiper, {
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      // navigation: {
      //   nextEl: '.slider-nav__next',
      //   prevEl: '.slider-nav__prev',
      // },

      // scrollbar: {
      //   el: '.swiper-scrollbar',
      //   draggable: true,
      // },

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
          slidesPerView: 1.4,
          spaceBetween: 16,
        },

        480: {
          slidesPerView: 2.2,
          spaceBetween: 20,
        },

        768: {
          slidesPerView: 3.2
        },

        1100: {
          slidesPerView: 3.2
        },

      }
    });

  })







}

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

  const filtersBody = vacancies.querySelector('.filters__body');

  const checkboxList = Array.from(filters.querySelectorAll('input[type="checkbox"]')); // Все чекбоксы
  const filtersActions = filters.querySelector('.filters__actions'); // Блок кнопок "Сбросить" и "Применить на моб.версии"
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
          if (btn.classList.contains('filters__actions-reset')) filtersBody.style.paddingBottom = '';
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
        filtersBody.style.paddingBottom = '160px';

      } else {
        filtersActions.classList.remove('js-filter-active');
        filtersBody.style.paddingBottom = '';
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







const html = document.querySelector('html');


function blockScrollBody () {
  if ( !html.classList.contains('js-block-scroll') ) {
    html.classList.add('js-block-scroll');
  }
};

function unblockScrollBody () {
  if ( html.classList.contains('js-block-scroll') ) {
    html.classList.remove('js-block-scroll');
  }
};

function toggleScrollBody () {
  html.classList.toggle('js-block-scroll');

};

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
