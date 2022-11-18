const employment = document.querySelector('.employment');

const widthDesktop = window.matchMedia('(min-width: 1000.1px)').matches;

if (employment) {

  if (widthDesktop) lineAnimation(employment)

    window.addEventListener('resize', () => {
      if (widthDesktop) lineAnimation(employment)
    });

}

function lineAnimation (employment) {
  const stepNumbers = employment.querySelectorAll('.employment-steps-item__number');
  const line = employment.querySelector('.employment-steps__line--dark');
  const images = employment.querySelectorAll('.employment__image img');

  console.log(images)
  images[3].classList.add('js-photo-active');
  console.log(images[3])


  const options = {
    rootMargin: '0px 0px -20%',
    threshold: 1,
  };

  const observerStep = new IntersectionObserver(callbackStep, options);
  const observerLine = new IntersectionObserver(callbackLine, options);
  const observerImages = new IntersectionObserver(callbackImages, options);

  function callbackStep (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('scroll-center');
      else entry.target.classList.remove('scroll-center')
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
        window.addEventListener('scroll', setHeightLine);
      }
    })
  };


  function callbackImages (entries) {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) el.classList.add('js-photo-active');
      else el.classList.remove('js-photo-active');
    })
  };


  stepNumbers.forEach(stepNum => observerStep.observe(stepNum));
  observerLine.observe(line);
  images.forEach(image => observerImages.observe(image));

};



