
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
