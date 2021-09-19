function checkChangesInElement(element, callback) {
  const observer = new MutationObserver(function(mutations) {
          callback();
        }),
        config = { attributes: true, childList: true, characterData: true, subtree: true };
  
  observer.observe(element, config);
}