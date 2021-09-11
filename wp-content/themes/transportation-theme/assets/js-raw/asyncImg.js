(function() {
  let scrollImg = document.querySelectorAll('[data-async-scroll-img]'),
      scrollBackgrounds = document.querySelectorAll('[data-async-scroll-background]'),
      asyncImg = document.querySelectorAll('[data-async-img]'),
      asyncBackground = document.querySelectorAll('[data-async-background]');
    
  window.addEventListener('load', function() {
    let srcComplexAddFunctions = [],
        srcComplexAddFunctionsForBackground = [];
  
    for (let scrollImgIteration = 0; scrollImgIteration < scrollImg.length; scrollImgIteration++) {
      let img = scrollImg[scrollImgIteration],
          srcForAdd = img.getAttribute('data-async-scroll-img'),
          srcAdded = false;
      
      srcComplexAddFunctions[scrollImgIteration] = function() {
        if (!srcAdded && checkThatObjectIsInScrollArea(img, 200)) {
          img.src = srcForAdd;
          srcAdded = true;
          document.removeEventListener('scroll', srcComplexAddFunctions[scrollImgIteration]);
        }
      }
      
      setTimeout(() => {
        if (!srcAdded && checkThatObjectIsInScrollArea(img, 200)) {
          img.src = srcForAdd;
          srcAdded = true;
        } else {
          document.addEventListener('scroll', srcComplexAddFunctions[scrollImgIteration]);
        }
      }, 100);
      
    }
    for (let scrollBackgroundIteration = 0; scrollBackgroundIteration < scrollBackgrounds.length; scrollBackgroundIteration++) {
      let img = scrollBackgrounds[scrollBackgroundIteration],
          srcForAdd = img.getAttribute('data-async-scroll-background'),
          srcAdded = false;
      
      srcComplexAddFunctionsForBackground[scrollBackgroundIteration] = function() {
        if (!srcAdded && checkThatObjectIsInScrollArea(img, 400)) {
          img.style.backgroundImage = `url(${srcForAdd})`;
          srcAdded = true;
          document.removeEventListener('scroll', srcComplexAddFunctionsForBackground[scrollBackgroundIteration]);
        }
      }
      
      setTimeout(() => {
        if (!srcAdded && checkThatObjectIsInScrollArea(img, 400)) {
          img.style.backgroundImage = `url(${srcForAdd})`;
          srcAdded = true;
        } else {
          document.addEventListener('scroll', srcComplexAddFunctionsForBackground[scrollBackgroundIteration]);
        }
      }, 100);
      
    }
    
    for (let asyncImgIteration = 0; asyncImgIteration < asyncImg.length; asyncImgIteration++) {
      let img = asyncImg[asyncImgIteration],
          srcForAdd = img.getAttribute('data-async-img');
      img.src = srcForAdd;
    }
    
    for (let asyncBackgroundIteration = 0; asyncBackgroundIteration < asyncBackground.length; asyncBackgroundIteration++) {
      let img = asyncBackground[asyncBackgroundIteration],
          srcForAdd = img.getAttribute('data-async-background');
      img.style.backgroundImage = `url(${srcForAdd})`;
    }

  });
}());