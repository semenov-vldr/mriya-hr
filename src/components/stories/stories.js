const storiesList = document.querySelectorAll('.stories');

if (storiesList) storiesList.forEach(stories => storiesActive (stories));


 function storiesActive (stories) {

   const videoStoriesList = stories.querySelectorAll('video');
   videoStoriesList.forEach(video => video.setAttribute('playsinline', '') );

  const dataStories = stories.dataset.stories; // Значение 'data-stories' у блока stories
  const openStoriesBtnList = document.querySelectorAll(`[data-open-stories="${dataStories}"]`);

   openStoriesBtnList.forEach(openStoriesBtn => openStoriesBtn.addEventListener('click', openStories));

   const close = stories.querySelector('.stories__close');
   close.addEventListener('click', closeStories);


   // Timeline
   function createTimeline () {
     const timelineList = stories.querySelector('.stories-timeline');
     const amountTimeline = stories.querySelector('.stories-content').childElementCount;

     for (let i=1; i<=amountTimeline; i++) {
       const timeline = document.createElement('li');
       const timelineInner = document.createElement('div');
       timeline.classList.add('stories-timeline__item');
       timelineInner.classList.add('stories-timeline__item-inner');
       timeline.appendChild(timelineInner);
       timelineList.appendChild(timeline);
     }
   };
   createTimeline();

   // Установка длительности слайда и timeline
   function setIntervalContent() {
     const videoActive = stories.querySelector('.js-stories-content-active video');
     const imageSlideActive = stories.querySelector('.js-stories-content-active.stories-content-item--image-text');
     if (videoActive) {
       const duration = videoActive.duration;
       runInterval(duration, 1);
     }
     if (imageSlideActive){
       runInterval(6, 1);
     }
   };


   function openStories () {
     stories.classList.add('js-stories-active');
     blockScrollBody();
     const videoActive = stories.querySelector('.js-stories-content-active video');
     if (videoActive) {
       videoActive.play();
     }
       setIntervalContent();
   };


   function closeStories () {
     const videoList = stories.querySelectorAll('.stories-content__item video');
     videoList.forEach(video => {
       video.pause();
       video.currentTime = 0;
     });
     stories.classList.remove('js-stories-active');
     resetStories();
     unblockScrollBody();
   };

   // Закрытие по клику вне блока
   document.body.addEventListener('click', (evt) => {
     if (evt.target.classList.contains('stories')) closeStories();
   });

   const activeTimeline = (timeline) => timeline.classList.add('js-timeline-active');
   const activeStoriesContent = (storiesContent) => storiesContent.classList.add('js-stories-content-active');
   const inActiveStoriesContent = (storiesContent) => storiesContent.classList.remove('js-stories-content-active');

   const timelineItems = stories.querySelectorAll('.stories-timeline__item');
   activeTimeline(timelineItems[0]);

   const storiesContentItems = stories.querySelectorAll('.stories-content__item');
   activeStoriesContent(storiesContentItems[0]);

   function resetStories () {
     timelineItems.forEach(activeTimeline);
     activeTimeline(timelineItems[0]);

     timelineItems.forEach(timeline => {
       let timelineInner = timeline.querySelector('.stories-timeline__item-inner');
       timelineInner.style.width = '';
     })
     storiesContentItems.forEach(inActiveStoriesContent);
     activeStoriesContent(storiesContentItems[0]);
   };

    // Перекл активности классов для слайдов и timeline
   function moveClass(activeClass, method, predicate) {
     const activeEl = stories.querySelector('.' + activeClass);
     const switchEl = activeEl[method];

     setIntervalContent();

     // Остановка предыдущего видео
     const videoPrev = activeEl.querySelector('.stories-content-item__video');
     if (videoPrev) {
       videoPrev.pause();
       videoPrev.currentTime = 0;
     };

     if ( predicate && !predicate(activeEl) ) return null;

     if (switchEl) {
       // Воспроизведение видео на переключенном слайде
       const videoActive = switchEl.querySelector('.stories-content-item__video');
       if (videoActive) videoActive.play();

       activeEl.classList.remove(activeClass);
       switchEl.classList.add(activeClass);
       setIntervalContent();
       return activeEl;
     } else {

       if (method === 'nextElementSibling') {
         closeStories()
       }
     }

     return null;
   };


   function storiesSwitchPrev () {
     const prev = moveClass('js-timeline-active', 'previousElementSibling', (el) => {
       const inner = el.querySelector('.stories-timeline__item-inner');
       const width = parseFloat(inner.style.width) || 0;
       inner.style.width = '';

       const videoPrev = stories.querySelector('.js-stories-content-active video');
       if (videoPrev) videoPrev.currentTime = 0;
       return width <= 20;
     });

     if (prev) moveClass( 'js-stories-content-active', 'previousElementSibling');
   };


   function storiesSwitchNext () {
     moveClass('js-stories-content-active', 'nextElementSibling');
     const el = moveClass('js-timeline-active', 'nextElementSibling');

     if (el) {
       el.querySelector('.stories-timeline__item-inner').style.width = '';
     }
   };

   const storiesPrev = stories.querySelector('.stories-content__switcher--prev');
   const storiesNext = stories.querySelector('.stories-content__switcher--next');
   storiesPrev.addEventListener('click', storiesSwitchPrev);
   storiesNext.addEventListener('click', storiesSwitchNext);


   // анимированная временная линия
   let timer;

   function runInterval (time, step) {
     clearInterval(timer);

     timer = setInterval(() => {
       const activeEl = stories.querySelector('.js-timeline-active .stories-timeline__item-inner');
       const width = parseFloat(activeEl.style.width) || 0; // преобразование строки в число

       if(width === 100 ) {storiesSwitchNext(); return;}

       activeEl.style.width = String(width + step) + '%';
       if (!stories.classList.contains('js-stories-active')) clearInterval(timer);

     }, time * 1000 * step / 100);
   };

 };







