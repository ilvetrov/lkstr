(function() {
  const carousels = document.querySelectorAll('[data-employees-carousel]');

  for (let carouselIteration = 0; carouselIteration < carousels.length; carouselIteration++) {
    const carousel = carousels[carouselIteration];
    const carouselName = carousel.getAttribute('data-employees-carousel');
    const leftControl = document.querySelector(`[data-employees-carousel-control-left="${carouselName}"]`);
    const rightControl = document.querySelector(`[data-employees-carousel-control-right="${carouselName}"]`);
    const container = findParentByClassName(carousel, 'js-carousel-container');
    if (!container.classList.contains('disabled')) {
      initEmployeeCarousel(carousel, leftControl, rightControl);
    } else {
      container.onShow = () => initEmployeeCarousel(carousel, leftControl, rightControl);
    }
  }
  
  function initEmployeeCarousel(carousel, leftControl, rightControl) {
    const employeesSlider = tns({
      container: carousel,
      items: 3,
      slideBy: 1,
      prevButton: leftControl,
      nextButton: rightControl,
      gutter: 30,
      fixedWidth: 272,
      nav: false,
      loop: false,
      swipeAngle: 30,
      preventScrollOnTouch: 'force',
      responsive: {
        1181: {
          fixedWidth: 272,
          gutter: 30,
        },
        556: {
          fixedWidth: 231,
          gutter: 34,
        },
        351: {
          fixedWidth: 272,
          gutter: 25,
        },
        1: {
          fixedWidth: 231,
          gutter: 25,
        }
      }
    });
  
    rightControl.addEventListener('click', () => {
      const info = employeesSlider.getInfo();
      if (info.index >= info.slideItems.length - 1) {
        rightControl.setAttribute('aria-disabled', 'true');
      }
    });
  }

  let imageGallery2Exists = false;
  const imageGallery2ShowingButton = document.getElementsByClassName('js-show-image-gallery-2')[0];
  if (imageGallery2ShowingButton) {
    imageGallery2ShowingButton.addEventListener('click', () => {
      if (!imageGallery2Exists) {
        imageGallery2Exists = true;
        setTimeout(() => {
          imageGalleryCarouselInit(
            document.getElementsByClassName('js-slider-image-gallery-2')[0],
            document.getElementsByClassName('js-slider-image-gallery-2-left')[0],
            document.getElementsByClassName('js-slider-image-gallery-2-right')[0]
          );
        }, 100);
      }
    });
  }

  const imageGallery1Container = document.getElementsByClassName('js-slider-image-gallery-1')[0],
        imageGallery1LeftButton = document.getElementsByClassName('js-slider-image-gallery-1-left')[0],
        imageGallery1RightButton = document.getElementsByClassName('js-slider-image-gallery-1-right')[0];
  if (imageGallery1Container) {
    imageGalleryCarouselInit(
      imageGallery1Container,
      imageGallery1LeftButton,
      imageGallery1RightButton,
    );
  }

  const imageGalleryInnerContainer = document.getElementsByClassName('js-slider-image-gallery-inner')[0],
        imageGalleryInnerLeftButton = document.getElementsByClassName('js-slider-image-gallery-inner-left')[0],
        imageGalleryInnerRightButton = document.getElementsByClassName('js-slider-image-gallery-inner-right')[0];
  if (imageGalleryInnerContainer && window.innerWidth > 1000) {
    imageGalleryCarouselInit(
      imageGalleryInnerContainer,
      imageGalleryInnerLeftButton,
      imageGalleryInnerRightButton,
      {
        fixedWidth: 200
      }
    );
  }
  
  function imageGalleryCarouselInit(container, leftButton, rightButton, settings = {
    fixedWidth: 272,
    responsive: {
      1251: {
        fixedWidth: 272,
      },
      701: {
        fixedWidth: 168,
      },
      1: {
        fixedWidth: false
      }
    }
  }) {
    let imageGallerySlider;
    imageGallerySlider = imageGalleryCarouselRegister(container, leftButton, rightButton, settings);
  }
  
  function imageGalleryCarouselRegister(container, leftButton, rightButton, settings) {
    let imageGallerySlider = tns({...{
      container: container,
      prevButton: leftButton,
      nextButton: rightButton,
      items: 1,
      slideBy: 1,
      gutter: 30,
      swipeAngle: 30,
      preventScrollOnTouch: 'force',
      nav: false,
      loop: false,
    }, ...settings})
    ;
    imageGalleryCarouselFunctional(imageGallerySlider, container);
  
    rightButton.addEventListener('click', () => {
      const info = imageGallerySlider.getInfo();
      if (info.index >= info.slideItems.length - 1) {
        rightButton.setAttribute('aria-disabled', 'true');
      }
    });

    return imageGallerySlider;
  }

  function imageGalleryCarouselFunctional(slider, sliderElement) {
    let initTouch, directionToRight;

    slider.events.on('indexChanged', (info, eventName) => {
      const currentItem = info.slideItems[info.index];
      if (currentItem) {
        if (!currentItem.classList.contains('tns-slide-move-position') && !currentItem.classList.contains('tns-slide-active')) {
          currentItem.classList.add('tns-slide-active');
        }
        
        if (currentItem.classList.contains('tns-slide-deactivated')) {
          currentItem.classList.remove('tns-slide-deactivated');
        }
        const lastIndexLength = info.index;
        for (let itemIteration = 0; itemIteration < lastIndexLength; itemIteration++) {
          const lastItem = info.slideItems[itemIteration];
          if (lastItem) {
            if (!lastItem.classList.contains('tns-slide-deactivated') && window.innerWidth > 700) {
              lastItem.classList.add('tns-slide-deactivated');
            }
          }
        }
        for (let itemIteration = 0; itemIteration < info.slideItems.length; itemIteration++) {
          const item = info.slideItems[itemIteration];
          if (item.classList.contains('tns-slide-move-position')) {
            item.classList.remove('tns-slide-move-position');
          }
        }
      }
    });
    slider.events.on('touchStart', (info, eventName) => {
      initTouch = info.event.changedTouches[0].clientX;
      
      for (let itemIteration = 0; itemIteration < info.slideItems.length; itemIteration++) {
        const item = info.slideItems[itemIteration];
        if (item) {
          if (!item.classList.contains('tns-slide-move-position')) {
            item.classList.add('tns-slide-move-position');
          }
          if (item.classList.contains('tns-slide-deactivated')) {
            item.classList.remove('tns-slide-deactivated');
          }
          if (item.classList.contains('tns-slide-active')) {
            item.classList.remove('tns-slide-active');
          }
        }
      }
    });
    slider.events.on('touchEnd', (info, eventName) => {
      for (let itemIteration = 0; itemIteration < info.slideItems.length; itemIteration++) {
        const item = info.slideItems[itemIteration];
        if (item) {
          if (item.classList.contains('tns-slide-move-position')) {
            item.classList.remove('tns-slide-move-position');
          }
        }
      }
      if (!directionToRight && info.index === 0) {
        const currentItem = info.slideItems[info.index];
        currentItem.classList.add('tns-slide-active');
      }
      if (directionToRight && info.index === info.slideItems.length - 1) {
        const lastElement = info.slideItems[info.index];
        lastElement.classList.add('tns-slide-active');
      }
    });
    sliderElement.addEventListener('touchmove', (e) => {
      const currentTouch = e.changedTouches[0].clientX;
      
      directionToRight = initTouch > currentTouch;
    });
  }
}());