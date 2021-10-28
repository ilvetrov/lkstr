(function() {
  const highLoadImageMinSize = 400_000;
  const maxParallelHighLoads = 2;
  
  const imagesElements = document.querySelectorAll('[data-async-image]');
  const loadingLazySupport = "loading" in HTMLImageElement.prototype;

  const highLoadsPlan = [];
  const currentHighLoads = [];
  
  window.addEventListener('load', function() {
    initAllNotManualAsyncImg();
    setTimeout(() => setInterval(() => requestAnimationFrame(startHighLoad), 1000), 2000);
  });
  function initAllNotManualAsyncImg() {
    for (let elementIteration = 0; elementIteration < imagesElements.length; elementIteration++) {
      const imageElement = imagesElements[elementIteration];
      initAsyncImg(imageElement, false);
    }
  }
  
  function initAsyncImg(imageElement, manual = true) {
    if (!imageElement.hasAttribute('data-async-image')) return 'not for async';
    
    const linksProperties = JSON.parse(imageElement.getAttribute('data-async-image'));
    
    if (linksProperties.manual && !manual) return;
    
    let setSrc;
    if (linksProperties.isBackground) {
      setSrc = () => {
        setSrcForBackground(linksProperties, imageElement);
      }
    } else {
      setSrc = () => {
        setSrcForImg(linksProperties, imageElement);
      }
    }
    setSrc();
  }
  function waitImageInScrollArea(imageElement, linksProperties, callback) {
    if (!linksProperties.scroll) return actionsWhenInScrollArea();

    if (checkThatObjectIsInScrollArea(imageElement, 800)) {
      actionsWhenInScrollArea();
    } else {
      let finished = false;
      const handler = window.addEventListener(OptimizedScroll.defaultEventName, function() {
        if (!finished && checkThatObjectIsInScrollArea(imageElement, 800)) {
          finished = true;

          actionsWhenInScrollArea();
          
          setTimeout(() => requestAnimationFrame(() => window.removeEventListener(OptimizedScroll.defaultEventName, handler)), 0);
        }
      });
    }
    
    function actionsWhenInScrollArea() {
      if (checkDisabled(imageElement)) {
        const interval = setInterval(() => {
          if (!checkDisabled(imageElement)) {
            clearInterval(interval);
  
            if (linksProperties.size >= highLoadImageMinSize) {
              highLoadsPlan.push({
                linksProperties,
                imageElement,
                callback
              });
            } else {
              callback();
            }
          }
        }, 500);
      } else {
        if (linksProperties.size >= highLoadImageMinSize) {
          highLoadsPlan.push({
            linksProperties,
            imageElement,
            callback
          });
        } else {
          callback();
        }
      }
    }
  }
  
  function setSrcForBackground(linksProperties, imageElement) {
    waitImageInScrollArea(imageElement, linksProperties, () => setAfterLoad(linksProperties, setNow));

    function setNow() {
      requestAnimationFrame(() => {
        imageElement.style.backgroundImage = `url(${linksProperties.src})`;
      });
    }
  }
  
  function setSrcForImg(linksProperties, imageElement) {
    if (loadingLazySupport && linksProperties.size < highLoadImageMinSize && !checkDisabled(imageElement)) {
      setNow();
    } else {
      waitImageInScrollArea(imageElement, linksProperties, () => setAfterLoad(linksProperties, setNow));
    }
    
    function setNow() {
      requestAnimationFrame(() => {
        imageElement.src = linksProperties.src;
      });
    }
  }

  function setAfterLoad(linksProperties, callback) {
    const newImage = new Image();
    newImage.src = linksProperties.src;
  
    newImage.onload = callback;
  }

  function startHighLoad() {
    if (currentHighLoads.length >= maxParallelHighLoads || highLoadsPlan.length === 0) return;
    
    const img = highLoadsPlan[0];
    currentHighLoads.push(img);
    highLoadsPlan.splice(0, 1);

    requestAnimationFrame(() => setAfterLoad(img.linksProperties, () => {
      img.callback();
      removeFromArray(currentHighLoads, img);

      setTimeout(() => {
        startHighLoad();
      }, 0);
    }));
  }
}());