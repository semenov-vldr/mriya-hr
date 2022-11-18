const body = document.querySelector('body');
const html = document.querySelector('html');


function blockScrollBody () {
  html.classList.add('js-block-scroll');
  body.classList.add('js-block-scroll');

}

function unblockScrollBody () {
  html.classList.remove('js-block-scroll');
  body.classList.remove('js-block-scroll');
}

function toggleScrollBody () {
  html.classList.toggle('js-block-scroll');
  body.classList.toggle('js-block-scroll');
}
