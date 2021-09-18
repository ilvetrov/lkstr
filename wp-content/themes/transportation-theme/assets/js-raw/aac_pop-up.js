const popUpsOpenCallbacks = {};
const popUpsHideCallbacks = {};

const popUps = document.querySelectorAll('[data-pop-up]');

for (let i = 0; i < popUps.length; i++) {
  const popUp = popUps[i];
  const popUpName = popUp.getAttribute('data-pop-up');
  const popUpButtons = document.querySelectorAll(`[data-pop-up-button="${popUpName}"]`);
  const popUpContent = popUp.querySelector('[data-pop-up-content]') || popUp;
  const popUpCloseButtons = document.querySelectorAll(`[data-pop-up-close-button="${popUpName}"]`);
  for (let buttonIteration = 0; buttonIteration < popUpButtons.length; buttonIteration++) {
    const popUpButton = popUpButtons[buttonIteration];
    const fixPopUp = popUpButton.hasAttribute('data-pop-up-fixed');
    popUpButton.addEventListener('click', () => {
      if (popUp.classList.contains('disabled')) {
        if (fixPopUp) {
          popUp.classList.add('fixed');
        } else {
          popUp.classList.remove('fixed');
        }
        showPopUp(popUp, popUpButton);
      }
    });
  }
  for (let closeButtonIteration = 0; closeButtonIteration < popUpCloseButtons.length; closeButtonIteration++) {
    const popUpCloseButton = popUpCloseButtons[closeButtonIteration];
    popUpCloseButton.addEventListener('click', function() {
      if (!popUp.classList.contains('hidden')) {
        hidePopUp(popUp);
      }
    });
  }
  document.addEventListener('click', e => {
    if (!popUp.classList.contains('hidden') && checkThatCurrentElementExistsOutside(popUpContent, e.target)) {
      hidePopUp(popUp);
    }
  });
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !popUp.classList.contains('hidden')) {
      hidePopUp(popUp);
    }
  });
}

function showPopUp(popUp, popUpButton = undefined) {
  popUp = detectPopUpInVariable(popUp);
  if (!popUp) return false;

  if (popUpButton.hasAttribute('data-pop-up-from-calc')) {
    popUp.classList.add('pop-up-from-calc');
  }

  const popUpIsList = popUp.hasAttribute('data-pop-up-is-list');
  const centerContentOnButton = popUp.hasAttribute('data-pop-up-center-content-on-button');

  popUp.classList.remove('disabled');
  if (!popUp.hasAttribute('data-pop-up-save-scroll')) {
    blockScroll();
  }

  const callbacks = popUpsOpenCallbacks[popUp.getAttribute('data-pop-up')];
  if (callbacks) {
    for (let callbackIteration = 0; callbackIteration < callbacks.length; callbackIteration++) {
      const callback = callbacks[callbackIteration];
      callback(popUp, popUpButton);
    }
  }

  if (centerContentOnButton && popUpButton) {
    setPositionToButtonCenter(popUp, popUpButton);
  }

  if (popUpIsList) {
    showMenuListBackground();
  }

  setTimeout(() => {
    popUp.classList.remove('hidden');
  }, 20);
}

function setPositionToButtonCenter(popUp, popUpButton) {
  popUp.style.maxWidth = '';
  const popUpButtonPosition = popUpButton.getBoundingClientRect();
  const popUpPosition = popUp.getBoundingClientRect();
  const minimalDistance = windowWidth > 350 ? 10 : 50;
  const innerLeftOffset = 10;
  const popUpWidthWithDistance = popUpPosition.width + minimalDistance * 2;
  popUp.style.left = (function() {
    const forButtonHorizontalCenter = popUpButtonPosition.x + popUpButtonPosition.width / 2 - popUpPosition.width / 2;
    const spaceBetweenPopUpAndWindowOnRight = windowWidth - forButtonHorizontalCenter - popUpWidthWithDistance;
    const spaceBetweenPopUpAndWindowOnLeft = forButtonHorizontalCenter - innerLeftOffset;
    const goodOnRight = spaceBetweenPopUpAndWindowOnRight >= minimalDistance;
    const goodOnLeft = spaceBetweenPopUpAndWindowOnLeft >= minimalDistance + innerLeftOffset;
    if (popUpWidthWithDistance >= windowWidth) {
      popUp.style.maxWidth = (windowWidth - minimalDistance * 2) + 'px';
      return minimalDistance;
    }
    if (!goodOnRight) {
      return windowWidth - popUpWidthWithDistance;
    }
    if (!goodOnLeft) {
      return minimalDistance + innerLeftOffset;
    }
    return forButtonHorizontalCenter;
  }()) + 'px';
  popUp.style.top = ((popUp.classList.contains('fixed') ? popUpButtonPosition.y : (popUpButtonPosition.y + window.scrollY)) + popUpButtonPosition.height) + 'px';
}

function hidePopUp(popUp, popUpButton = undefined) {
  popUp = detectPopUpInVariable(popUp);
  if (!popUp) return false;

  popUp.classList.remove('pop-up-from-calc');

  const popUpIsList = popUp.hasAttribute('data-pop-up-is-list');

  const callbacks = popUpsHideCallbacks[popUp.getAttribute('data-pop-up')];
  if (callbacks) {
    for (let callbackIteration = 0; callbackIteration < callbacks.length; callbackIteration++) {
      const callback = callbacks[callbackIteration];
      callback(popUp, popUpButton);
    }
  }

  popUp.classList.add('hidden');
  if (popUpIsList) {
    hideMenuListBackground();
  }
  setTimeout(() => {
    popUp.classList.add('disabled');
    if (!popUp.hasAttribute('data-pop-up-save-scroll')) {
      unblockScroll();
    }
  }, 220);
}

function detectPopUpInVariable(popUp) {
  if (typeof popUp === 'string' || typeof popUp === 'number') {
    popUp = document.querySelector(`[data-pop-up="${popUp}"]`);
  }
  return popUp;
}

function addCallbackToOpenOfPopUp(popUp, callback) {
  popUp = detectPopUpInVariable(popUp);
  if (!popUp) return false;

  if (!popUpsOpenCallbacks[popUp.getAttribute('data-pop-up')]) {
    popUpsOpenCallbacks[popUp.getAttribute('data-pop-up')] = [];
  }
  popUpsOpenCallbacks[popUp.getAttribute('data-pop-up')].push(callback);
}

function addCallbackToHideOfPopUp(popUp, callback) {
  popUp = detectPopUpInVariable(popUp);
  if (!popUp) return false;

  if (!popUpsHideCallbacks[popUp.getAttribute('data-pop-up')]) {
    popUpsHideCallbacks[popUp.getAttribute('data-pop-up')] = [];
  }
  popUpsHideCallbacks[popUp.getAttribute('data-pop-up')].push(callback);
}