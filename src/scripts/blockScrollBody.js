const body = document.querySelector('body');
const html = document.querySelector('html');

// function preventScroll(evt) {
//   evt.stopPropagation();
//   evt.preventDefault();
//
//   return false;
// }
//
// function disableScroll () {
//   body.addEventListener('wheel', preventScroll)
//   console.log('disableScroll')
// };
//
// function enableScroll () {
//   body.removeEventListener('wheel', preventScroll)
//   console.log('enableScroll')
// }



function blockScrollBody () {

  if ( !html.classList.contains('js-block-scroll') && !body.classList.contains('js-block-scroll') ) {
    html.classList.add('js-block-scroll');
    body.classList.add('js-block-scroll');
  }
};

function unblockScrollBody () {

  if ( html.classList.contains('js-block-scroll') && body.classList.contains('js-block-scroll') ) {
    console.log(html.classList.contains('js-block-scroll'))
    html.classList.remove('js-block-scroll');
    body.classList.remove('js-block-scroll');
  }
};

function toggleScrollBody () {
  html.classList.toggle('js-block-scroll');
  body.classList.toggle('js-block-scroll');

};
