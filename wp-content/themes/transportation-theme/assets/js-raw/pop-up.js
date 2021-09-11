(function() {
  const popUps = document.querySelectorAll('[data-pop-up]');

  for (let i = 0; i < popUps.length; i++) {
    const popUp = popUps[i],
          popUpName = popUp.getAttribute('data-pop-up'),
          popUpButtons = document.querySelectorAll(`[data-pop-up-button="${popUpName}"]`),
          popUpContent = popUp.querySelector('[data-pop-up-content]');
    for (let buttonIteration = 0; buttonIteration < popUpButtons.length; buttonIteration++) {
      const popUpButton = popUpButtons[buttonIteration];
      popUpButton.addEventListener('click', () => {
        if (popUp.classList.contains('disabled')) {
          showPopUp(popUp);
        }
      });
    }
    popUp.addEventListener('click', e => {
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

  function showPopUp(popUp) {
    popUp.classList.remove('disabled');
    blockScroll();
    setTimeout(() => {
      popUp.classList.remove('hidden');
    }, 20);
  }
  
  function hidePopUp(popUp) {
    popUp.classList.add('hidden');
    setTimeout(() => {
      popUp.classList.add('disabled');
      unblockScroll();
    }, 220);
  }
}());