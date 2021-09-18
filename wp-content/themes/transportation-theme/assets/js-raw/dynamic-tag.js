(function() {
  const elements = document.querySelectorAll('[data-dynamic-tag]');

  for (let elementIteration = 0; elementIteration < elements.length; elementIteration++) {
    const element = elements[elementIteration];
    const tagInString = element.getAttribute('data-dynamic-tag');
    const link = (tagInString.match(/src="(.+?)"/) ?? [])[1];
    if (!link) continue;
    const virtualElement = htmlStringToJs(tagInString);
    const attributes = virtualElement.attributes;
    const delay = Number(element.getAttribute('data-dynamic-tag-delay'));
    const whenScroll = element.hasAttribute('data-dynamic-tag-when-scroll');

    const newElement = document.createElement(virtualElement.tagName.toLowerCase());
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      newElement.setAttribute(attribute['name'], attribute['value']);
    }

    window.addEventListener('load', function() {
      if (delay) {
        setTimeout(() => {
          replaceElement(element, newElement);
        }, delay);

        return;
      }
      if (whenScroll) {
        let srcAdded = false;
        const handler = window.addEventListener(OptimizedScroll.defaultEventName, function() {
          if (!srcAdded && checkThatObjectIsInScrollArea(element, 400)) {
            srcAdded = true;
            replaceElement(element, newElement);
            window.removeEventListener(OptimizedScroll.defaultEventName, handler);
          }
        });
        return;
      }
      
      replaceElement(element, newElement);
    });
  }

  function replaceElement(element, newElement) {
    element.parentNode.appendChild(newElement);
    element.remove();
  }
    
}());