(function() {
  function process() {
    const getters = document.querySelectorAll('[data-get-max-height]');
    const memory = {};
    for (let getterIteration = 0; getterIteration < getters.length; getterIteration++) {
      const getter = getters[getterIteration];
      const getterName = getter.getAttribute('data-get-max-height');
      let maxHeight = 0;

      if (memory[getterName] === undefined) {
        const senders = document.querySelectorAll(`[data-send-max-height="${getterName}"]`);
        for (let senderIteration = 0; senderIteration < senders.length; senderIteration++) {
          const sender = senders[senderIteration];
          const senderHeight = sender.offsetHeight;
          if (senderHeight > maxHeight) {
            maxHeight = senderHeight;
          }
        }
        memory[getterName] = maxHeight;
      } else {
        maxHeight = memory[getterName];
      }

      const heightCSS = `${maxHeight}px`;
      if (getter.style.minHeight !== heightCSS) {
        getter.style.minHeight = heightCSS;
      }
    }
  }
  window.addEventListener('load', process);
  window.addEventListener('resize', process);
}());