(function() {
  let animations = [
    'container',
    'planet',
  ];
  for (let defaultAnimationIteration = 0; defaultAnimationIteration < animations.length; defaultAnimationIteration++) {
    const animation = animations[defaultAnimationIteration];
    animationInit(animation);
  }
  for (let delayAnimationIteration = 0; delayAnimationIteration < animations.length; delayAnimationIteration++) {
    const animation = animations[delayAnimationIteration];
    animationInit(animation + '-delay');
  }
  for (let visibleAnimationIteration = 0; visibleAnimationIteration < animations.length; visibleAnimationIteration++) {
    const animation = animations[visibleAnimationIteration];
    animationInit(animation + '-visible');
  }
  
  function animationInit(animation) {
    const animationName = animation + '-animation',
          prepareToAnimationClass = 'prepare-' + animationName,
          elements = document.getElementsByClassName(prepareToAnimationClass),
          offsets = getOffsets(animation);
    for (let elementIteration = 0; elementIteration < elements.length; elementIteration++) {
      const element = elements[elementIteration],
            animationInfinitely = element.hasAttribute('data-animation-infinitely'),
            listener = function() {
              if (checkThatObjectIsInScrollArea(element, offsets[0], offsets[1])) {
                element.classList.add(animationName);
                if (!animationInfinitely) {
                  window.removeEventListener('scroll', listener);
                }
              } else if (animationInfinitely) {
                element.classList.remove(animationName);
              }
            };
      if (checkThatObjectIsInScrollArea(element, offsets[0], offsets[1])) {
        element.classList.add(animationName);
        if (animationInfinitely) {
          window.addEventListener('scroll', listener);
        }
      } else {
        window.addEventListener('scroll', listener);
      }
    }
  }

  let jsAnimationElements = document.querySelectorAll('[data-js-animation]');

  for (let jsAnimationIteration = 0; jsAnimationIteration < jsAnimationElements.length; jsAnimationIteration++) {
    const jsAnimationElement = jsAnimationElements[jsAnimationIteration];
    jsAnimation(jsAnimationElement);
  }

  function getOffsets(animation) {
    switch (animation) {
      case 'container':
        return [-500, 0];
    
      default:
        return [0, 0];
    }
  }

  function jsAnimation(element) {
    const animationInfinitely = element.hasAttribute('data-animation-infinitely'),
          removingClass = element.getAttribute('data-js-animation'),
          listener = function() {
            if (checkThatObjectIsInScrollArea(element, 0)) {
              element.classList.remove(removingClass);
              if (!animationInfinitely) {
                window.removeEventListener(element, listener);
              }
            } else if (animationInfinitely) {
              element.classList.add(removingClass);
            }
          };
    if (checkThatObjectIsInScrollArea(element, 0)) {
      element.classList.remove(removingClass);
      if (animationInfinitely) {
        window.addEventListener('scroll', listener);
      }
    } else {
      window.addEventListener('scroll', listener);
    }
  }
}());