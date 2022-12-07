const blog = document.querySelector('.blog');

if (blog) {
  const showMore = blog.querySelector('.blog__theme-item--btn-more');

  const startItems = 8;

  const blogItems = blog.querySelectorAll('.blog__theme-item');
  const blogItemsLength = blogItems.length;

  showMore.textContent = `+ ${blogItemsLength - startItems}`;

  showMore.addEventListener('click', () => {
    blogItems.forEach(el => el.classList.add('js-visible'));
    showMore.classList.add('hidden');
  })

  if (blogItemsLength < startItems + 1) showMore.classList.add('hidden');

}
