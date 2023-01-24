const footer = document.querySelector('footer.footer');

if (footer) {
  const copyrightYear  = footer.querySelector('.footer__copyright-year');
  copyrightYear .textContent = new Date().getFullYear();
}
