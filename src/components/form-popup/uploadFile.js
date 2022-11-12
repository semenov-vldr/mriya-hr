
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





