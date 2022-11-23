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
    console.log(files)
    files.forEach(file => {
      if (file.size <= MAXSIZEFILE) {
        uploadFile(file);
        preloaderActive(dropZone, file);
        showFileName(file);
      } else alert('Размер файла превышен');
    })
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

  reader.addEventListener('progress', (evt) => {
    if (evt.loaded && evt.total) {
      const percent = (evt.loaded / evt.total) * 100;
      spinner.classList.add('js-spinner-active');
      if (percent === 100) spinner.classList.remove('js-spinner-active');
    }
  });
  reader.readAsDataURL(file);
};


// Обработчик файлов, добавленных через проводник
function addFileInput () {
  const formUpload = document.querySelector('.form-upload');
  const inputFile = document.querySelector('.form-upload__input');
  if (inputFile) {

    const changeHandler = (evt) => {
      if (!evt.target.files.length) return
      const files = Array.from(evt.target.files);

      if (files) {
        files.forEach(file => {
          if (file.size <= MAXSIZEFILE) {
            preloaderActive(formUpload, file);
            showFileName(file);
          } else alert('Размер файла превышен');

        });
      }
    };

    inputFile.addEventListener('change', (evt) => changeHandler(evt));
    formUpload.addEventListener('click', () => inputFile.nextElementSibling.click());
  }
}





