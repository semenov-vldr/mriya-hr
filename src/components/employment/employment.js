let previousPosition = window.scrollTop || document.documentElement.scrollTop;

const employment = document.querySelector('.employment');

const widthDesktop = window.matchMedia('(min-width: 0.1px)').matches;

if (employment) {
  if (widthDesktop) lineAnimation(employment)
    window.addEventListener('resize', () => {
      if (widthDesktop) lineAnimation(employment);
    });
}



function lineAnimation (employment) {
  const stepNumbers = employment.querySelectorAll('.employment-steps-item__number');
  const line = employment.querySelector('.employment-steps__line--change');
  const images = employment.querySelectorAll('.employment__image img');


  const options = {
    rootMargin: '100% 0px -20%',
    threshold: 1,
  };



  function inActiveAllImages () {
    images.forEach(image => image.classList.remove('js-photo-active'));
  };

  function addClassPhotoActive (el) {
    el.classList.add('js-photo-active');
  };


  function callbackStep (entries) {
    entries.forEach((entry) => {
      let currentPosition = window.scrollTop || document.documentElement.scrollTop;
      const el = entry.target;
      const number = el.dataset.number - 1;
      if (entry.isIntersecting) {
        el.classList.add('js-scroll-animate');

        if ( previousPosition < currentPosition) {
          inActiveAllImages();
          addClassPhotoActive(images[number]);
        }
      }
      else {
        el.classList.remove('js-scroll-animate');
        inActiveAllImages();
        (number-1 >=0) ? addClassPhotoActive( images[number-1] ) : addClassPhotoActive( images[0] );
      }
    })
  };


  function callbackLine (entries) {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        const startPosition = window.scrollY;

        function setHeightLine () {
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



