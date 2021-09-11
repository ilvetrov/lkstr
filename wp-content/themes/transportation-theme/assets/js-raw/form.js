const form = document.getElementsByClassName('js-form')[0],
      phoneFields = document.getElementsByClassName('js-phone-field');

if (phoneFields && typeof callPopUpPhoneMask != 'undefined' && callPopUpPhoneMask === true) {
  for (let i = 0; i < phoneFields.length; i++) {
    const phoneField = phoneFields[i];
    IMask(phoneField, {
      mask : '{+}0{ (}`000{) }`000{ - }`00{ - }`00',
    });
  }
}

if (form) {
  form.onsubmit = () => {
    return formConfirmation(form);
  }
}

function lookAtMeAnimation(object) {
  if (!object.classList.contains('look-at-me')) {
    object.classList.add('look-at-me');
    setTimeout(() => {
      object.classList.remove('look-at-me');
    }, 750);
  }
}

function checkInputIsEmpty(input) {
  return (input.getAttribute('type') == 'checkbox' && !input.checked) || (input.getAttribute('type') == 'tel' && (input.value == '' || input.value == '+7 (___) ___ - __ - __' || !input.value.match(/\+*\d \(\d\d\d\) \d\d\d - \d\d - \d\d/))) || (input.tagName == 'INPUT' && input.value == '') || (input.tagName == 'DIV' && (input.innerText == '' || input.innerText == 'Не выбрано'));
}

function doFocusOnEmptyInput(form) {
  let fields = form.getElementsByClassName('js-form-field');
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i],
          input = field.getElementsByClassName('js-form-input')[0];
    if (checkInputIsEmpty(input)) {
      if (field.classList.contains('deactivated')) {
        field.classList.remove('deactivated');
      }
      if (input.getAttribute('type') == 'checkbox') {
        if (!checkElementVisibility(field)) {
          smoothScrollToElement(field, window.innerHeight / 2);
        }
      } else {
        if (!checkElementVisibility(field, -23)) {
          smoothScrollToElement(field, window.innerHeight / 2);
        }
        input.focus();
      }
      lookAtMeAnimation(field);
      return true;
    }
  }
  return false;
}

function formConfirmation(form) {
  return !doFocusOnEmptyInput(form);
}

function checkElementVisibility(element, offset = 0) {
  let bottomScreenY = window.pageYOffset + window.innerHeight,
      yElementPositionRelativeToTheScreen = window.pageYOffset + element.getBoundingClientRect().y;
  return (yElementPositionRelativeToTheScreen < bottomScreenY) && element.getBoundingClientRect().y > offset;
}