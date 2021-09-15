{
  function process() {
    const savingHeights = document.getElementsByClassName('js-save-height');
    
    for (let i = 0; i < savingHeights.length; i++) {
      const element = savingHeights[i];
      element.style.height = '';
      const styles = getComputedStyle(element);
      const height = element.clientHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom);
      element.style.minHeight = height + 'px';
    }
  }
  process();

  window.addEventListener('resize-width', process);
}