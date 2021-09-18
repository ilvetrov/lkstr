function removeWhitespaces(string) {
  return string.split(`\n`).join('').split('  ').join('');
}