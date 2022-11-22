const images = document.querySelectorAll('img');

if (images) images.forEach(image => image.setAttribute("loading", "lazy"));

