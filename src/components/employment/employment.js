const employment = document.querySelector('.employment');

const widthDesktop = window.matchMedia('(min-width: 1000.1px)').matches;

if (employment) {
  if (widthDesktop) lineAnimation(employment)
    window.addEventListener('resize', () => {
      if (widthDesktop) lineAnimation(employment);
    });
}



function lineAnimation (employment) {
  const stepNumbers = employment.querySelectorAll('.employment-steps-item__number');
  const line = employment.querySelector('.employment-steps__line--dark');
  const images = employment.querySelectorAll('.employment__image img');


  const options = {
    rootMargin: '0px 0px -20%',
    threshold: 1,
  };


  function callbackStep (entries) {
    entries.forEach((entry, indexEntry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('scroll-center');

        images.forEach(image => image.classList.remove('js-photo-active'));

        images[0].classList.add('js-photo-active');

        //console.log(`index: ${indexEntry} + el: ${el.textContent}`)


        // images.forEach((image, indexImage) => {
        //   if (indexEntry === indexImage) {
        //     image.classList.add('js-photo-active');
        //   }
        // })

      }
      else {
        el.classList.remove('scroll-center');
        //console.log(`index: ${indexEntry} + el: ${el.textContent}`)
      }

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



  const observerStep = new IntersectionObserver(callbackStep, options);
  const observerLine = new IntersectionObserver(callbackLine, options);


  stepNumbers.forEach(stepNum => observerStep.observe(stepNum));
  observerLine.observe(line);

};



