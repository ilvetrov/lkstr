let advancedElementsForScrollBlocking = document.getElementsByClassName('js-for-replace-scrollbar'),
    lastScrollBarWidth = getScrollBarWidth(false);

function blockScroll() {
  if (checkScrollbar()) {
    blockScrollBar();
  }
  document.documentElement.classList.add('block-scroll');
}
function unblockScroll() {
  document.documentElement.classList.remove('block-scroll');
  unblockScrollBar();
}

function blockScrollBar() {
  document.body.style.paddingRight = getScrollBarWidth() + 'px';
  for (let i = 0; i < advancedElementsForScrollBlocking.length; i++) {
    const advancedElementForScrollBlocking = advancedElementsForScrollBlocking[i];
    advancedElementForScrollBlocking.style.paddingRight = getScrollBarWidth() + 'px';
  }
}
function unblockScrollBar() {
  if (document.body.style.paddingRight != '') {
    document.body.style.paddingRight = '';
  }
  for (let i = 0; i < [...advancedElementsForScrollBlocking, ...document.getElementsByClassName('js-padding-instead-of-scrollbar')].length; i++) {
    const advancedElementForScrollBlocking = [...advancedElementsForScrollBlocking, ...document.getElementsByClassName('js-padding-instead-of-scrollbar')][i];
    if (advancedElementForScrollBlocking.style.paddingRight != '') {
      advancedElementForScrollBlocking.style.paddingRight = '';
    }
  }
}
function blockScrollBarIn(element, cached = false) {
  if (cached) {
    element.style.paddingRight = getScrollBarWidth() + 'px';
  } else {
    element.style.paddingRight = getScrollBarWidthFrom(element) + 'px';
  }
  element.classList.add('js-padding-instead-of-scrollbar');
}
function checkScrollbar() {
  return window.innerWidth > document.body.clientWidth;
}
function getScrollBarWidth(updateLast = true) {
  try {
    const scrollBarWidth = window.innerWidth - document.body.clientWidth;
    if (updateLast) lastScrollBarWidth = scrollBarWidth;
    return scrollBarWidth;
  } catch (error) {
    console.log(error);
    return 0;
  }
}
function checkScrollbarIn(element) {
  return element.offsetWidth > element.clientWidth;
}
function getScrollBarWidthFrom(element) {
  return element.offsetWidth - element.clientWidth;
}