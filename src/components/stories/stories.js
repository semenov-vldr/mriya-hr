
const stories = document.querySelector('.stories');

if (stories) {

  const openStoriesBtn = document.querySelector('.open-stories');
  if (openStoriesBtn) {
    openStoriesBtn.addEventListener('click', openStories);
  }

  const close = stories.querySelector('.stories__close');
  close.addEventListener('click', closeStories);

  function closeStories () {
    stories.classList.remove('js-stories-active')
  }

  function openStories () {
    stories.classList.add('js-stories-active');
    runInterval(5, 1);
  }


  const timelineItems = stories.querySelectorAll('.stories-timeline__item');
  timelineItems[0].classList.add('js-timeline-active');

  const storiesContentItems = stories.querySelectorAll('.stories-content__item');
  storiesContentItems[0].classList.add('js-stories-content-active');


  function moveClass(activeClass, method, predicate) {
    const activeEl = stories.querySelector('.' + activeClass);
    const switchEl = activeEl[method];

    if ( predicate && !predicate(activeEl) ) return null;

    if (switchEl) {
      activeEl.classList.remove(activeClass);
      switchEl.classList.add(activeClass);
      return activeEl;
    }
    return null;
  };

  function storiesSwitchPrev () {
      const prev = moveClass('js-timeline-active', 'previousElementSibling', (el) => {
      const inner = el.querySelector('.stories-timeline__item-inner');
      const width = parseFloat(inner.style.width) || 0;

      el.querySelector('.stories-timeline__item-inner').style.width = '';
      return width <= 20;
    });

    if (prev) moveClass( 'js-stories-content-active', 'previousElementSibling');
  };


  function storiesSwitchNext () {
    moveClass('js-stories-content-active', 'nextElementSibling');
    const el = moveClass('js-timeline-active', 'nextElementSibling');

    if (el) el.querySelector('.stories-timeline__item-inner').style.width = '';
  };


  const storiesPrev = stories.querySelector('.stories-content__switcher--prev');
  const storiesNext = stories.querySelector('.stories-content__switcher--next');
  storiesPrev.addEventListener('click', storiesSwitchPrev);
  storiesNext.addEventListener('click', storiesSwitchNext);


  // анимированное перекл слайдов
  let timer;

  function runInterval (time, step) {
    clearInterval(timer);

    timer = setInterval(() => {
      const activeEl = stories.querySelector('.js-timeline-active')
                              .querySelector('.stories-timeline__item-inner');
      const width = parseFloat(activeEl.style.width) || 0; // преобразование строки в число

      if(width === 100 ) {
        storiesSwitchNext();
        return;
      }

      activeEl.style.width = String(width + step) + '%';

    },time * 1000 * step / 100);
  };

}





