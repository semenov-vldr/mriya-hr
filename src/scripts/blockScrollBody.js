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
