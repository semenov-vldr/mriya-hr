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

  let options = {
    rootMargin: '0px 0px -20%',
    threshold: 1
  };

  const stepNumbers = employment.querySelectorAll('.employment-steps-item__number');

  const line = employment.querySelector('.employment-steps__line--dark');
  const lineRect = line.getBoundingClientRect();
  console.log(lineRect)

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
  }

  function callbackLine (entries) {
    entries.forEach((entry) => {
      console.log(entry)
      let i = 20;
      if (entry.isIntersecting) {
        console.log(employment.scrollHeight)
      }
      else {
        entry.target.style.height = `5%`
      }
    })
  }

  stepNumbers.forEach(stepNum => observerStep.observe(stepNum));
  observerLine.observe(line)








//-----------------------
}


