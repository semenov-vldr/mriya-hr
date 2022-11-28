let previousPosition = window.scrollTop || document.documentElement.scrollTop;

const employment = document.querySelector('.employment');

const widthDesktop = window.matchMedia('(min-width: 1000.1px)').matches;


<<<<<<< HEAD
// function activeAllImages (images) {
//   images.forEach(image => image.classList.add('js-photo-active'));
// };

function inActiveAllImages (images) {
  images.forEach(image => image.classList.remove('js-photo-active'));
};

=======
function activeAllImages (images) {
  images.forEach(image => image.classList.add('js-photo-active'));
};

function inActiveAllImages (images) {
  images.forEach(image => image.classList.remove('js-photo-active'));
};

>>>>>>> 33674a9a9c0f56e4181cfdb075f7cb547249f402
function addClassPhotoActive (el) {
  el.classList.add('js-photo-active');
};

if (employment) {

  const stepNumbers = employment.querySelectorAll('.employment-steps-item__number');
  const line = employment.querySelector('.employment-steps__line--change');
  const images = employment.querySelectorAll('.employment__images img');


  if (widthDesktop) {
    images[0].classList.remove('js-photo-active');
    lineAnimation(employment)
<<<<<<< HEAD
=======
  } else {
    //activeAllImages(images)
>>>>>>> 33674a9a9c0f56e4181cfdb075f7cb547249f402
  }


  window.addEventListener('resize', () => {
    if (widthDesktop) lineAnimation(employment);
  });


  function lineAnimation() {

    const options = {
      rootMargin: '100% 0px -30%',
      threshold: 1,
    };


    function callbackStep(entries) {
      entries.forEach((entry) => {
        let currentPosition = window.scrollTop || document.documentElement.scrollTop;
        const el = entry.target;
        const number = el.dataset.number - 1;
        if (entry.isIntersecting) {
          el.classList.add('js-scroll-animate');

          if (previousPosition < currentPosition) {
            inActiveAllImages(images);
            addClassPhotoActive(images[number]);
          }
        } else {
          el.classList.remove('js-scroll-animate');
          inActiveAllImages(images);
          (number - 1 >= 0) ? addClassPhotoActive(images[number - 1]) : addClassPhotoActive(images[0]);
        }
      })
    };


    function callbackLine(entries) {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          const startPosition = window.scrollY;

          function setHeightLine() {
            let heightValue = window.scrollY - startPosition;
            el.style.height = `${heightValue}px`;
          };
          window.addEventListener('scroll', setHeightLine);
        }
      })
    };

    const observerStep = new IntersectionObserver(callbackStep, options);
    const observerLine = new IntersectionObserver(callbackLine, options);

    stepNumbers.forEach(stepNum => observerStep.observe(stepNum));
    observerLine.observe(line);

  };


}
