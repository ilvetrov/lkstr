function checkThatObjectIsInScrollArea(object, topOffset = 200, bottomOffset = topOffset) {
  return (object.getBoundingClientRect().y - topOffset <= window.innerHeight && object.getBoundingClientRect().y + bottomOffset + object.offsetHeight > 0) || false;
}
function checkTopElementVisibility(element, offset = 0) {
  let bottomScreenY = window.pageYOffset + window.innerHeight,
      yElementPositionRelativeToTheScreen = window.pageYOffset + element.getBoundingClientRect().y;
  return (yElementPositionRelativeToTheScreen < bottomScreenY) && element.getBoundingClientRect().y > offset;
}
function checkElementVisibilityByScreenCenter(element) {
  let bottomScreenY = window.pageYOffset + (window.innerHeight / 2),
      yElementPositionRelativeToTheScreen = window.pageYOffset + element.getBoundingClientRect().y;
  return (yElementPositionRelativeToTheScreen < bottomScreenY);
}