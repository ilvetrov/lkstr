const changingTransformViaScrollElements = document.getElementsByClassName('js-change-transform-via-scroll'),
      changingTransformViaElementPositionElements = document.getElementsByClassName('js-change-transform-via-element-position'),
      cacheOfChangingTransformViaElementPositionElements = [];

for (let i = 0; i < changingTransformViaScrollElements.length; i++) {
  const transformingElement = changingTransformViaScrollElements[i],
        scrollMod = transformingElement.getAttribute('data-scroll-mod') || 1;
  changeTransformViaScroll(transformingElement, scrollMod);
  window.addEventListener('scroll', () => {
    changeTransformViaScroll(transformingElement, scrollMod);
  });
}
for (let i2 = 0; i2 < changingTransformViaElementPositionElements.length; i2++) {
  const transformingElement = changingTransformViaElementPositionElements[i2],
        elementForMeasure = document.querySelector(transformingElement.getAttribute('data-element'));
  if (elementForMeasure) {
    changeTransformViaElementPosition(transformingElement, elementForMeasure);
    window.addEventListener('scroll', () => {
      changeTransformViaElementPosition(transformingElement, elementForMeasure);
    });
  }
}

function changeTransformViaScroll(element, scrollMod = 1) {
  const currentScroll = window.pageYOffset,
        newTransform = currentScroll * scrollMod - 100;
  if (newTransform >= 0) {
    element.style.transform = 'translateY(0%)';
  } else {
    element.style.transform = `translateY(${newTransform}%)`;
  }
}
function changeTransformViaElementPosition(transformingElement, elementForMeasure) {
  const elementForMeasurePosition = window.innerHeight - elementForMeasure.getBoundingClientRect().y,
        transformingElementHeightOffset = transformingElement.offsetHeight - 100,
        newTransform = 100 - (elementForMeasurePosition - transformingElementHeightOffset),
        elementInitHeight = cacheOfChangingTransformViaElementPositionElements[String(transformingElement.classList)] || transformingElement.offsetHeight;
  if (!cacheOfChangingTransformViaElementPositionElements[String(transformingElement.classList)]) {
    cacheOfChangingTransformViaElementPositionElements[String(transformingElement.classList)] = elementInitHeight;
  }
  if (newTransform <= 0) {
    transformingElement.style.transform = 'translateY(0px)';
  } else if (newTransform >= elementInitHeight) {
    transformingElement.style.transform = `translateY(${elementInitHeight}px)`;
  } else {
    transformingElement.style.transform = `translateY(${newTransform}px)`;
  }
}