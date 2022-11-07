const areas = document.querySelector('.areas');

if (areas) {
  const showMore = areas.querySelector('.areas__item--more');

  const startItems = 8;

  const areasItems = areas.querySelectorAll('.areas__item');
  const areasItemsLength = areasItems.length;

  showMore.textContent = `+${areasItemsLength - startItems}`;

  showMore.addEventListener('click', () => {
    areasItems.forEach(el => el.classList.add('js-visible'));
    showMore.classList.add('hidden');
  })

  if (areasItemsLength < startItems + 1) showMore.classList.add('hidden');


}
