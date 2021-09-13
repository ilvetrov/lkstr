const lists = document.getElementsByClassName('js-list-menu'),
      listsBackground = document.getElementsByClassName('js-list-menu-background')[0];

let listCanToggle = true;
for (let listIteration = 0; listIteration < lists.length; listIteration++) {
  const list = lists[listIteration],
        listButton = list.getElementsByClassName('js-list-menu-button')[0],
        items = list.getElementsByClassName('js-list-menu-item'),
        input = list.getElementsByClassName('js-list-menu-items-search')[0];
  
  listButton.addEventListener('click', () => {
    if (listCanToggle && !list.classList.contains('list-menu_one-item')) {
      if (list.classList.contains('list-disabled')) {
        list.classList.remove('list-disabled');
        setTimeout(() => {
          list.classList.remove('collapsed');
        }, 1);
        showMenuListBackground();
        if (window.innerWidth > 768) {
          input.focus();
        }
      } else {
        closeItemsList(list);
      }
    }
  });
  document.addEventListener('click', e => {
    if (!list.classList.contains('collapsed') && checkThatCurrentElementExistsOutside(listButton, e.target) && document.activeElement.tagName != 'INPUT' && !e.target.classList.contains('list-menu__items-search')) {
      closeItemsList(list);
    }
  });
  listsBackground.addEventListener('click', () => {
    if (!list.classList.contains('collapsed')) {
      closeItemsList(list);
    }
  });
  document.body.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !list.classList.contains('collapsed')) {
      closeItemsList(list);
    }
  });
  document.body.addEventListener('keyup', e => {
    let activeItem;
    if (
      e.key === 'Enter'
      && !list.classList.contains('collapsed')
      && Array.from(items).filter(item => {
        if (!item.classList.contains('disabled')) {
          activeItem = item;
          return true;
        } else {
          return false;
        }
      }).length == 1
    ) {
      activeItem.click();
    }
  });
}

function deactivateListButton(list) {
  const button = list.getElementsByClassName('js-list-menu-button')[0];
  
  button.classList.add('deactivated');
}
function selectItemInList(list) {
  const isPopUp = list.hasAttribute('data-pop-up-is-list');
  const items = list.getElementsByClassName('js-list-menu-item');
  const searchInput = list.getElementsByClassName('js-list-menu-items-search')[0];
  const button = list.getElementsByClassName('js-list-menu-button')[0];
  
  button && button.classList.remove('deactivated');
  if (isPopUp) {
    hidePopUp(list);
  } else {
    closeItemsList(list);
  }
  setTimeout(() => {
    searchInput && (searchInput.value = '');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.classList.remove('disabled');
    }
  }, 250);
}
function closeItemsList(list) {
  listCanToggle = false;
  list.classList.add('collapsed');
  setTimeout(() => {
    list.classList.add('list-disabled');
  }, 200);
  hideMenuListBackground();
}

function showMenuListBackground() {
  listsBackground.classList.remove('disabled');
  setTimeout(() => {
    listsBackground.classList.remove('hidden');
  }, 1);
}
function hideMenuListBackground() {
  listsBackground.classList.add('hidden');
  setTimeout(() => {
    listsBackground.classList.add('disabled');
    listCanToggle = true;
  }, 300);
}

const menuSearchInputs = document.getElementsByClassName('js-list-menu-items-search');
for (let menuSearchInputIteration = 0; menuSearchInputIteration < menuSearchInputs.length; menuSearchInputIteration++) {
  const input = menuSearchInputs[menuSearchInputIteration];
  input.addEventListener('input', () => {
    searchCity(input);
  });
}

function searchCity(searchElement) {
  const searchValue = searchElement.value.trim(),
        items = searchElement.parentElement.parentElement.getElementsByClassName('js-list-menu-item');
  
  if (searchValue != '') {
    const regExpForSearchValue = new RegExp('(^|- *)' + searchValue, 'i');
    for (let i = 0; i < items.length; i++) {
      const item = items[i],
            cityName = item.innerText;
      if (!cityName.match(regExpForSearchValue)) {
        item.classList.add('disabled');
      } else {
        item.classList.remove('disabled');
      }
    }
  } else {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.classList.remove('disabled');
    }
  }
}

function insertValuesToList(valuesProperties, init = false) {
  const values = valuesProperties.values;
  const markedValues = valuesProperties.markedValues || [];
  const markedTitle = valuesProperties.markedTitle || 'Нет доставки';
  const list = valuesProperties.list;
  const valueOutput = list.getElementsByClassName('js-list-menu-output')[0];
  const itemsOutput = list.getElementsByClassName('js-list-menu-items')[0];
  if (valueOutput && !init && values.length > 0 && values.indexOf(valueOutput.innerText) == -1) {
    deactivateListButton(list);
    valueOutput.innerHTML = '';
  }
  if (init && values.length == 1) {
    itemsOutput.innerHTML = '';
    const value = values[0],
          newElement = document.createElement('div');
    newElement.classList.add('list-menu__item');
    newElement.classList.add('js-list-menu-item');
    newElement.innerHTML = value;

    let elementOnPage = itemsOutput.appendChild(newElement);
    elementOnPage.addEventListener('click', () => {
      valuesProperties.callback(elementOnPage);
      selectItemInList(list);
    });
    setTimeout(() => {
      valuesProperties.callback(elementOnPage, 'scriptOwner');
      selectItemInList(list);
      list.classList.add('calc__list_one-item');
    }, 1);
    if (markedValues.length > 0) {
      itemsOutput.appendChild(document.createElement('hr'));
      for (let valuesIteration = 0; valuesIteration < markedValues.length; valuesIteration++) {
        const value = markedValues[valuesIteration],
              newElement = document.createElement('div');
        newElement.classList.add('list-menu__item');
        newElement.classList.add('list-menu__item_marked');
        newElement.classList.add('js-list-menu-item');
        newElement.setAttribute('title', markedTitle);
        newElement.innerHTML = value;

        let elementOnPage = itemsOutput.appendChild(newElement);
        elementOnPage.addEventListener('click', () => {
          valuesProperties.callback(elementOnPage);
          selectItemInList(list);
        });
      }
    }
  } else {
    if (list.classList.contains('calc__list_one-item') && (values.indexOf(valueOutput.innerText) == -1 || values.length > 1)) {
      list.classList.remove('calc__list_one-item');
    }
    if (init || (valueOutput && itemsOutput.innerHTML.indexOf(valueOutput.innerHTML) == -1)) {
      valueOutput.innerHTML = '';
    }
    itemsOutput.innerHTML = '';
    for (let valuesIteration = 0; valuesIteration < values.length; valuesIteration++) {
      const value = values[valuesIteration],
            newElement = document.createElement('div');
      newElement.classList.add('list-menu__item');
      newElement.classList.add('js-list-menu-item');
      newElement.innerHTML = value;

      let elementOnPage = itemsOutput.appendChild(newElement);
      elementOnPage.addEventListener('click', () => {
        valuesProperties.callback(elementOnPage);
        selectItemInList(list);
      });
    }
    if (markedValues.length > 0) {
      itemsOutput.appendChild(document.createElement('hr'));
      for (let valuesIteration = 0; valuesIteration < markedValues.length; valuesIteration++) {
        const value = markedValues[valuesIteration],
              newElement = document.createElement('div');
        newElement.classList.add('list-menu__item');
        newElement.classList.add('list-menu__item_marked');
        newElement.classList.add('js-list-menu-item');
        newElement.setAttribute('title', markedTitle);
        newElement.innerHTML = value;

        let elementOnPage = itemsOutput.appendChild(newElement);
        elementOnPage.addEventListener('click', () => {
          valuesProperties.callback(elementOnPage);
          selectItemInList(list);
        });
      }
    }
  }
}