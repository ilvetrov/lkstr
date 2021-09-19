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
          srcAdded = true;
          setSrcForImg(img, srcForAdd);
          window.removeEventListener(OptimizedScroll.defaultEventName, srcComplexAddFunctions[scrollImgIteration]);
        }
      }
      
      setTimeout(() => {
        if (!srcAdded && checkThatObjectIsInScrollArea(img, 200)) {
          srcAdded = true;
          setSrcForImg(img, srcForAdd);
        } else {
          window.addEventListener(OptimizedScroll.defaultEventName, srcComplexAddFunctions[scrollImgIteration]);
        }
      }, 100);
      
    }
    for (let scrollBackgroundIteration = 0; scrollBackgroundIteration < scrollBackgrounds.length; scrollBackgroundIteration++) {
      let img = scrollBackgrounds[scrollBackgroundIteration],
          srcForAdd = img.getAttribute('data-async-scroll-background'),
          srcAdded = false;
      
      srcComplexAddFunctionsForBackground[scrollBackgroundIteration] = function() {
        if (!srcAdded && checkThatObjectIsInScrollArea(img, 400)) {
          srcAdded = true;
          setSrcForBackground(img, srcForAdd);
          window.removeEventListener(OptimizedScroll.defaultEventName, srcComplexAddFunctionsForBackground[scrollBackgroundIteration]);
        }
      }
      
      setTimeout(() => {
        if (!srcAdded && checkThatObjectIsInScrollArea(img, 400)) {
          srcAdded = true;
          setSrcForBackground(img, srcForAdd);
        } else {
          window.addEventListener(OptimizedScroll.defaultEventName, srcComplexAddFunctionsForBackground[scrollBackgroundIteration]);
        }
      }, 100);
      
    }
    
    for (let asyncImgIteration = 0; asyncImgIteration < asyncImg.length; asyncImgIteration++) {
      let img = asyncImg[asyncImgIteration],
          srcForAdd = img.getAttribute('data-async-img');
      setSrcForImg(img, srcForAdd);
    }
    
    for (let asyncBackgroundIteration = 0; asyncBackgroundIteration < asyncBackground.length; asyncBackgroundIteration++) {
      let img = asyncBackground[asyncBackgroundIteration],
          srcForAdd = img.getAttribute('data-async-background');
      setSrcForBackground(img, srcForAdd);
    }

  });

  function setSrcForImg(img, srcForAdd) {
    const newImage = new Image();
    newImage.src = srcForAdd;
  
    newImage.onload = function() {
      img.src = srcForAdd;
    };
  }

  function setSrcForBackground(img, srcForAdd) {
    const newImage = new Image();
    newImage.src = srcForAdd;
  
    newImage.onload = function() {
      img.style.backgroundImage = `url(${srcForAdd})`;
    };
  }
}());