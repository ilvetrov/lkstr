(function() {
  const elements = document.querySelectorAll('[data-dynamic-tag]');

  for (let elementIteration = 0; elementIteration < elements.length; elementIteration++) {
    const element = elements[elementIteration];
    const tagInString = element.getAttribute('data-dynamic-tag');
    const link = (tagInString.match(/src="(.+?)"/) ?? [])[1];
    if (!link) continue;
    const virtualElement = htmlStringToJs(tagInString);
    const attributes = virtualElement.attributes;

    const newElement = document.createElement(virtualElement.tagName.toLowerCase());
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      newElement.setAttribute(attribute['name'], attribute['value']);
    }

    window.addEventListener('load', function() {
      element.parentNode.appendChild(newElement);
      element.remove();
    });
  }
    
}());