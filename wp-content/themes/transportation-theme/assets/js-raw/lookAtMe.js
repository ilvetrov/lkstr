function lookAtMe(object) {
  if (!object.classList.contains('look-at-me')) {
    object.classList.add('look-at-me');
    setTimeout(() => {
      object.classList.remove('look-at-me');
    }, 750);
  }
}