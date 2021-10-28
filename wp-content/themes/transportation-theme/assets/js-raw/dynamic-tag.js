(function() {
  const elements = document.querySelectorAll('[data-dynamic-tag]');

  for (let elementIteration = 0; elementIteration < elements.length; elementIteration++) {
    const element = elements[elementIteration];
    const tagInString = element.getAttribute('data-dynamic-tag');
    const link = (tagInString.match(/src="(.+?)"/) ?? [])[1];
    if (!link) continue;
    const virtualElement = htmlStringToJs(tagInString);
    const delay = Number(element.getAttribute('data-dynamic-tag-delay'));
    const whenScroll = element.hasAttribute('data-dynamic-tag-when-scroll');

    window.addEventListener('load', function() {
      if (delay) {
        setTimeout(() => {
          replaceElement(element, initNewElementAsReal(virtualElement));
        }, delay);
        return;
      }
      if (whenScroll) {
        let srcAdded = false;
        function listener() {
          if (!srcAdded && checkThatObjectIsInScrollArea(element, 400)) {
            srcAdded = true;
            replaceElement(element, initNewElementAsReal(virtualElement));
            window.removeEventListener(OptimizedScroll.defaultEventName, handler);
          }
        };
        const handler = window.addEventListener(OptimizedScroll.defaultEventName, listener);
        listener();
        return;
      }
      
      replaceElement(element, initNewElementAsReal(virtualElement));
    });

  }
  function initNewElementAsReal(virtualElement) {
    const newElement = document.createElement(virtualElement.tagName.toLowerCase());
    const attributes = virtualElement.attributes;
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      newElement.setAttribute(attribute['name'], attribute['value']);
    }
    return newElement;
  }

  function replaceElement(element, newElement) {
    element.parentNode.appendChild(newElement);
    element.remove();
  }
    
}());
