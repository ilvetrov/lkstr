(function() {
  const headerMenu = document.getElementsByClassName('js-header-menu')[0],
        headerMenuContainer = document.getElementsByClassName('js-header-menu-container')[0],
        openingButtons = document.getElementsByClassName('js-open-header-menu'),
        closingButtons = document.getElementsByClassName('js-close-header-menu'),
        animationButtons = document.getElementsByClassName('js-header-button-animation'),
        links = headerMenu.getElementsByTagName('a');
  for (let i = 0; i < openingButtons.length; i++) {
    const openingButton = openingButtons[i];
    openingButton.addEventListener('click', () => {
      if (headerMenu.classList.contains('disabled')) {
        openHeaderMenu();
      }
    });
  }
  for (let i = 0; i < [...closingButtons, ...links].length; i++) {
    const closingButton = [...closingButtons, ...links][i];
    closingButton.addEventListener('click', () => {
      if (!headerMenu.classList.contains('hidden')) {
        closeHeaderMenu();
      }
    });
  }

  function openHeaderMenu() {
    headerMenu.classList.remove('disabled');
    if (!checkScrollbarIn(headerMenu)) {
      blockScrollBarIn(headerMenuContainer, 'cached');
    }
    headerMenu.classList.remove('hidden');
    blockScroll();
    turnOnAnimationForButtons();
  }
  function closeHeaderMenu() {
    turnOffAnimationForButtons();
    headerMenu.classList.add('hidden');
    setTimeout(() => {
      unblockScroll();
      headerMenu.classList.add('disabled');
    }, 220);
  }

  function turnOnAnimationForButtons() {
    for (let i = 0; i < animationButtons.length; i++) {
      const animationButton = animationButtons[i];
      if (!animationButton.classList.contains('active')) {
        animationButton.classList.add('active');
      }
    }
  }
  function turnOffAnimationForButtons() {
    for (let i = 0; i < animationButtons.length; i++) {
      const animationButton = animationButtons[i];
      if (animationButton.classList.contains('active')) {
        animationButton.classList.remove('active');
      }
    }
  }
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !headerMenu.classList.contains('hidden')) {
      closeHeaderMenu();
    }
  });

  const headerMenuServicesButton = document.getElementsByClassName('js-header-menu-services-button')[0],
        headerMenuServicesList = document.getElementsByClassName('js-header-menu-services-list')[0];
  
  headerMenuServicesButton.addEventListener('click', () => {
    if (!headerMenuServicesButton.classList.contains('active')) {
      headerMenuServicesButton.classList.add('active');
      headerMenuServicesList.classList.remove('hidden');
    } else {
      headerMenuServicesList.classList.add('hidden');
      headerMenuServicesButton.classList.remove('active');
    }
  });
}());