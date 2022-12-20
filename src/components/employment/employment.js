{

  const employment = document.querySelector('.employment');

  const desktopWidth = window.matchMedia('(min-width: 1001px)').matches;

  if (employment && desktopWidth) ImagesChangeFade ();


  function ImagesChangeFade () {

    const employmentSteps = document.querySelectorAll('.employment-steps__item');
    const images = employment.querySelectorAll('.employment__images img');

    images.forEach(img => img.classList.add('js-hidden'));
    employmentSteps.forEach(step => step.classList.remove('js-step-active'));

    images[0].classList.remove('js-hidden');
    employmentSteps[0].classList.add('js-step-active');

    employmentSteps.forEach((step, indexStep) => {
      step.addEventListener('click', () => {
        images.forEach(img => img.classList.add('js-hidden'));
        employmentSteps.forEach(step => step.classList.remove('js-step-active'));

        step.classList.add('js-step-active');
        images[indexStep].classList.remove('js-hidden');
      })
    })



  }



}
