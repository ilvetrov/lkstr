const widthResizeEvent = new CustomEvent('resize-width');

let windowWidth = window.innerWidth;

window.addEventListener('resize', function() {
  if (window.innerWidth !== windowWidth) {
    windowWidth = window.innerWidth;
    
    window.dispatchEvent(widthResizeEvent);
  }
});