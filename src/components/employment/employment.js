// document.addEventListener('DOMContentLoaded', animationSteps);
//
//
// function animationSteps () {
//   const employment = document.querySelector('.employment');
//   if (employment) {
//     const stepNumbers = employment.querySelectorAll('.employment-steps-item__number');
//
//   }
// }

const employment = document.querySelector('.employment');

if (employment) {

  const stepNumbers = employment.querySelectorAll('.employment-steps-item__number');
  const line = employment.querySelector('.employment-steps__line--dark');

  const options = {
    rootMargin: '0px 0px -20%',
    threshold: 1
  };


  const observerStep = new IntersectionObserver(callbackStep, options)
  const observerLine = new IntersectionObserver(callbackLine, options)

  function callbackStep (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-center')
      }
      else {
        entry.target.classList.remove('scroll-center')
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

        window.addEventListener('scroll', setHeightLine)
    }
  })
  };

  stepNumbers.forEach(stepNum => observerStep.observe(stepNum));
  observerLine.observe(line);




}


