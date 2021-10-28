function checkDisabled(element) {
  const elementPosition = element.getBoundingClientRect();
  return elementPosition.x === 0
  && elementPosition.y === 0
  && elementPosition.left === 0
  && elementPosition.right === 0
  && elementPosition.top === 0
  && elementPosition.bottom === 0
  && elementPosition.height === 0
  && elementPosition.width === 0;
}