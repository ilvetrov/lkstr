(function() {
  const initiators = document.querySelectorAll('[data-init-only-max-height]');
  for (let initiatorIteration = 0; initiatorIteration < initiators.length; initiatorIteration++) {
    const initiator = initiators[initiatorIteration];
    const initiatorName = initiator.getAttribute('data-init-only-max-height');
    const elements = document.querySelectorAll(`[data-only-max-height="${initiatorName}"]`);
    let maxHeight = 0;
    let maxHeightIteration;
    for (let elementIteration = 0; elementIteration < elements.length; elementIteration++) {
      const element = elements[elementIteration];
      const elementHeight = element.offsetHeight;
      if (elementHeight > maxHeight) {
        maxHeight = elementHeight;
        maxHeightIteration = elementIteration;
      }
    }
    for (let elementIteration = 0; elementIteration < elements.length; elementIteration++) {
      const element = elements[elementIteration];
      if (maxHeightIteration === elementIteration) {
        element.classList.remove('obedient');
      } else {
        element.classList.add('obedient');
      }
    }
  }
}());