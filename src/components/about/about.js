const blockAbout = document.querySelector('.about');

if (blockAbout) {

  //carousel-1
  {
    let myIndex = 0;
    carousel1 ();

    function carousel1 () {
      let images = blockAbout.querySelectorAll('.about__image:nth-child(1) img');

      if (images) {
        images.forEach(img => {
          img.style.opacity = "0"
        })
        myIndex++;
        if (myIndex > images.length) {myIndex = 1}

        images[myIndex-1].style.opacity = "1"

        setTimeout(carousel1, 5000)
      }
    }
  }


  //carousel-2
  {
    let myIndex = 0;

    setTimeout(carousel2, 3000)

    function carousel2 () {
      let images = blockAbout.querySelectorAll('.about__image:nth-child(2) img');

      if (images) {
        images.forEach(img => img.style.opacity = "0")

        myIndex++;

        if (myIndex > images.length) {myIndex = 1}
        images[myIndex-1].style.opacity = "1"

        setTimeout(carousel2, 5000)
      }
    }
  }

}
