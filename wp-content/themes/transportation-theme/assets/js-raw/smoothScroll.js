function smoothScrollTo(selector, offset = 0, mobileOffset = offset) {
  // try {
    let elementY;
    if (window.innerWidth > 380) {
      elementY = document.querySelector(selector).getBoundingClientRect().y + window.pageYOffset - offset;
    } else {
      elementY = document.querySelector(selector).getBoundingClientRect().y + window.pageYOffset - mobileOffset;
    }
    window.scrollTo({top: elementY, behavior: 'smooth'});
    return false;
  // } catch (error) {
  //   return true;
  // }
}

function smoothScrollToElement(element, offset = 0, mobileOffset = offset) {
  // try {
    let elementY;
    if (window.innerWidth > 380) {
      elementY = element.getBoundingClientRect().y + window.pageYOffset - offset;
    } else {
      elementY = element.getBoundingClientRect().y + window.pageYOffset - mobileOffset;
    }
    window.scrollTo({top: elementY, behavior: 'smooth'});
    return false;
  // } catch (error) {
  //   return true;
  // }
}

(function() {
  const links = document.getElementsByTagName('a');
  for (let i = 0; i < links.length; i++) {
    const link = links[i],
          anchorArray = link.href.match(/#\w+(-*\w+)*/i);
    if (anchorArray) {
      const anchor = anchorArray[0],
            targetElement = document.querySelector(anchor);
      if (targetElement) {
        link.setAttribute('onclick', `return smoothScrollTo("${anchor}");`);
      }
    }
  }
}());