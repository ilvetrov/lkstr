function findParentByClassName(element, className) {
  if (element.classList.contains(className)) {
    return element;
  } else {
    if (element === document.body) return undefined;
    return findParentByClassName(element.parentElement, className);
  }
}