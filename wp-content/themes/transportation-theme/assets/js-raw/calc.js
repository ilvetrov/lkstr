const formulaAliases = {
        WVC : getWeightPriceOrVolumePrice,
        WC : getWeightPrice,
        VC : getVolumePrice,
        WV : getWeightOrVolume,
        V : getVolumeForOperations,
        W : getWeight,
      },
      sendingCitiesListElement = document.getElementsByClassName('js-calc-sending-cities')[0],
      recipientCitiesListElement = document.getElementsByClassName('js-calc-recipient-cities')[0],
      sendingCityOutput = document.getElementsByClassName('js-calc-sending-city-output')[0],
      recipientCityOutput = document.getElementsByClassName('js-calc-recipient-city-output')[0],
      weightElement = document.getElementsByClassName('js-calc-input-weight')[0],
      volumeElement = document.getElementsByClassName('js-calc-input-volume')[0],
      outputAddressFrom = document.getElementsByClassName('js-calc-address-from')[0],
      outputAddressTo = document.getElementsByClassName('js-calc-address-to')[0],
      outputVolume = document.getElementsByClassName('js-calc-volume')[0],
      outputWeight = document.getElementsByClassName('js-calc-weight')[0],
      outputTotalCost = document.getElementsByClassName('js-calc-total-cost')[0],
      symbolOfVolume = document.getElementsByClassName('js-calc-volume-symbol')[0],
      symbolOfWeight = document.getElementsByClassName('js-calc-weight-symbol')[0],
      calcStatus = document.getElementsByClassName('js-calc-status')[0],
      calcStatusOutput = document.getElementsByClassName('js-calc-status-output')[0];

if (typeof volumeElement != 'undefined' && typeof weightElement != 'undefined') {
  volumeElement.addEventListener('input', () => {
    let weight = getWeight(),
        volume = getVolume(),
        currentPath = getCurrentPathData();
    if (typeof volume == 'number') {
      if (typeof currentPath != 'string' && typeof weight == 'number' && !checkWeightUsing(weight, volume)) {
        symbolOfVolume.innerText = '₽./м³';
        outputVolume.innerText = breakNumberIntoThousands(currentPath.volume);
      } else {
        symbolOfVolume.innerText = 'м³';
        outputVolume.innerText = breakNumberIntoThousands(Math.ceil(volume));
      }
    } else {
      symbolOfVolume.innerText = 'м³';
      outputVolume.innerText = '0';
  
      if (symbolOfWeight.innerText == '₽./кг') {
        symbolOfWeight.innerText = 'кг';
        if (typeof weight == 'number') {
          outputWeight.innerText = breakNumberIntoThousands(Math.ceil(weight));
        } else {
          outputWeight.innerText = 0;
        }
      }
    }
  });
  weightElement.addEventListener('input', () => {
    let weight = getWeight(),
        volume = getVolume(),
        currentPath = getCurrentPathData();
    if (typeof weight == 'number') {
      if (typeof currentPath != 'string' && typeof volume == 'number' && checkWeightUsing(weight, volume)) {
        symbolOfWeight.innerText = '₽./кг';
        outputWeight.innerText = breakNumberIntoThousands(currentPath.weight);
      } else {
        symbolOfWeight.innerText = 'кг';
        outputWeight.innerText = breakNumberIntoThousands(Math.ceil(weight));
      }
    } else {
      symbolOfWeight.innerText = 'кг';
      outputWeight.innerText = '0';
  
      if (symbolOfVolume.innerText == '₽./м³') {
        symbolOfVolume.innerText = 'м³';
        if (typeof volume == 'number') {
          outputVolume.innerText = breakNumberIntoThousands(Math.ceil(volume));
        } else {
          outputVolume.innerText = '0';
        }
      }
    }
  });
}

function doFormula() {
  let formulaResult = calculateFormula(getFormulaWithValues()),
      weight = getWeight(),
      volume = getVolume(),
      currentPath = getCurrentPathData();

  if (typeof currentPath != 'string' && typeof volume == 'number' && typeof weight == 'number') {

    if (checkWeightUsing(weight, volume)) {
      symbolOfWeight.innerText = '₽./кг';
      outputWeight.innerText = breakNumberIntoThousands(currentPath.weight);

      symbolOfVolume.innerText = 'м³';
      outputVolume.innerText = breakNumberIntoThousands(Math.ceil(volume));
    } else {
      symbolOfVolume.innerText = '₽./м³';
      outputVolume.innerText = breakNumberIntoThousands(currentPath.volume);
      
      symbolOfWeight.innerText = 'кг';
      outputWeight.innerText = breakNumberIntoThousands(Math.ceil(weight));
    }
  }
  if (typeof formulaResult == 'number') {
    outputTotalCost.innerText = breakNumberIntoThousands(Math.ceil(formulaResult));
  } else {
    outputTotalCost.innerText = '0';
  }
  if (calcStatusOutput) {
    if (typeof formulaResult == 'string') {
      calcStatusOutput.innerText = formulaResult;
      if (calcStatus && calcStatus.classList.contains('hidden')) {
        calcStatus.classList.remove('hidden');
      }
    } else if (calcStatus && !calcStatus.classList.contains('hidden')) {
      calcStatus.classList.add('hidden');
    }
  }
}
function getFormulaWithValues() {
  let newFormula = calcFormula;
  for (const aliasName in formulaAliases) {
    if (formulaAliases.hasOwnProperty(aliasName)) {
      const aliasValueFunc = formulaAliases[aliasName],
            aliasValue = aliasValueFunc(),
            regExpForReplacement = new RegExp(aliasName, 'g');
      if (typeof aliasValue == 'string') {
        return aliasValue;
      }
      newFormula = newFormula.replace(regExpForReplacement, aliasValue);
    }
  }
  return {
    formula : newFormula
  };
}
function calculateFormula(formulaData) {
  if (typeof formulaData == 'string') {
    return formulaData;
  }
  return (new Function('return ' + formulaData.formula + ';'))();
}
function checkWeightUsing(weight, volume) {
  return weight / volume > densityThreshold;
}
function getWeightOrVolume() {
  const weight = getWeight(),
        volume = getVolumeForOperations();
  if (typeof volume == 'string') {
    return volume;
  }
  if (typeof weight == 'string') {
    return weight;
  }
  if (checkWeightUsing(weight, volume)) {
    return weight;
  } else {
    return volume;
  }
}
function getVolume() {
  return Number(volumeElement.value) || 'Введите объем';
}
function getVolumeForOperations() {
  const volume = getVolume();
  if (typeof volume == 'string') {
    return volume;
  }
  if (typeof volume == 'number') {
    return Math.max(volume, 1);
  }
}
function getWeight() {
  return Number(weightElement.value) || 'Введите вес';
}
function getWeightPriceOrVolumePrice() {
  let weightPrice = getWeightPrice(),
      volumePrice = getVolumePrice();
  if (typeof volumePrice == 'string') {
    return volumePrice;
  }
  if (typeof weightPrice == 'string') {
    return weightPrice;
  }
  let weight = getWeight(),
      volume = getVolumeForOperations();
  if (typeof volume == 'string') {
    return volume;
  }
  if (typeof weight == 'string') {
    return weight;
  }
  if (checkWeightUsing(weight, volume)) {
    return getWeightPrice();
  } else {
    return getVolumePrice();
  }
}
function getVolumePrice() {
  let data = getCurrentPathData();
  if (typeof data == 'string') {
    return data;
  } else {
    return Number(data.volume);
  }
}
function getWeightPrice() {
  let data = getCurrentPathData();
  if (typeof data == 'string') {
    return data;
  } else {
    return Number(data.weight);
  }
}
function getSendingCities() {
  const cities = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[0].c;
    if (cities.indexOf(city) == -1) {
      cities.push(city);
    }
  }
  return cities.sort();
}
function getRecipientCities() {
  const cities = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[1].c;
    if (cities.indexOf(city) == -1) {
      cities.push(city);
    }
  }
  return cities.sort();
}
function getPathsForSendingCity(sendingCity) {
  const paths = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[0].c;
    if (city == sendingCity) {
      paths.push(path);
    }
  }
  return paths;
}
function getPathsNotForSendingCity(sendingCity) {
  const paths = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[0].c;
    if (city != sendingCity) {
      paths.push(path);
    }
  }
  return paths;
}
function getPathsForRecipientCity(recipientCity) {
  const paths = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[1].c;
    if (city == recipientCity) {
      paths.push(path);
    }
  }
  return paths;
}
function getPathsNotForRecipientCity(recipientCity) {
  const paths = [];
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          city = path[1].c;
    if (city != recipientCity) {
      paths.push(path);
    }
  }
  return paths;
}
function getRecipientCitiesFor(sendingCity) {
  const paths = getPathsForSendingCity(sendingCity),
        cities = [];
  for (let pathIteration = 0; pathIteration < paths.length; pathIteration++) {
    const path = paths[pathIteration],
          recipientCity = path[1].c;
    if (cities.indexOf(recipientCity) == -1) {
      cities.push(recipientCity);
    }
  }
  return cities.sort();
}
function getRecipientCitiesNotFor(sendingCity) {
  const paths = getPathsNotForSendingCity(sendingCity),
        cities = [];
  for (let pathIteration = 0; pathIteration < paths.length; pathIteration++) {
    const path = paths[pathIteration],
          recipientCity = path[1].c;
    if (cities.indexOf(recipientCity) == -1) {
      cities.push(recipientCity);
    }
  }

  const citiesForSending = getRecipientCitiesFor(sendingCity);
  return cities.filter(city => {
    return citiesForSending.indexOf(city) == -1;
  }).sort();
}
function getSendingCitiesFor(recipientCity) {
  const paths = getPathsForRecipientCity(recipientCity),
        cities = [];
  for (let pathIteration = 0; pathIteration < paths.length; pathIteration++) {
    const path = paths[pathIteration],
          sendingCity = path[0].c;
    if (cities.indexOf(sendingCity) == -1) {
      cities.push(sendingCity);
    }
  }
  return cities.sort();
}
function getSendingCitiesNotFor(recipientCity) {
  const paths = getPathsNotForRecipientCity(recipientCity),
        cities = [];
  for (let pathIteration = 0; pathIteration < paths.length; pathIteration++) {
    const path = paths[pathIteration],
          sendingCity = path[0].c;
    if (cities.indexOf(sendingCity) == -1) {
      cities.push(sendingCity);
    }
  }
  
  const citiesForRecipient = getSendingCitiesFor(recipientCity);
  return cities.filter(city => {
    return citiesForRecipient.indexOf(city) == -1;
  }).sort();
}
function getPathData(sendingCity, recipientCity) {
  if (sendingCity == '') {
    return 'Выберите город отправления';
  }
  if (recipientCity == '') {
    return 'Выберите город прибытия';
  }
  for (let pathIteration = 0; pathIteration < calcCitiesData.length; pathIteration++) {
    const path = calcCitiesData[pathIteration],
          sendingCityFromPath = path[0].c,
          recipientCityFromPath = path[1].c,
          weightPrice = path[2].c,
          volumePrice = path[3].c;
    if (sendingCityFromPath == sendingCity && recipientCityFromPath == recipientCity) {
      return {
        weight : Number(weightPrice),
        volume : Number(volumePrice)
      };
    }
  }
}

function getCurrentPathData() {
  return getPathData(getCurrentSendingCity(), getCurrentRecipientCity());
}

function getCurrentSendingCity() {
  return sendingCitiesListElement.getElementsByClassName('js-calc-list-output')[0].innerHTML;
}
function getCurrentRecipientCity() {
  return recipientCitiesListElement.getElementsByClassName('js-calc-list-output')[0].innerHTML;
}

function breakNumberIntoThousands(number) {
  let string = String(number),
      beforeAndAfterPoint = string.split('.'),
      beforePoint = beforeAndAfterPoint[0],
      afterPoint = beforeAndAfterPoint[1],
      inThousands = beforePoint.replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 "),
      unitedString = afterPoint ? [inThousands, afterPoint].join('.') : inThousands;
  return unitedString;
}
function prepareValueForOperations(sourceValue) {
  return Number(sourceValue.replace(/\s/g, '').replace(/ /g, '').replace(/&nbsp/g, '').match(/[\d.\-\+]+/i));
}

function checkThousandsInNumber(number) {
  return String(number).match(/\d *\d\d\d$/);
}
function removeThousandsFromNumber(number) {
  if (checkThousandsInNumber(number)) {
    return Number(String(number).replace(/\d\d\d$/, ''));
  }
  return number;
}

function createTextDuplicateElement(inputValueElement) {
  const newElement = document.createElement('span');
  newElement.setAttribute('data-text-duplicate-for', inputValueElement.id);
  newElement.classList.add('text-duplicate_' + inputValueElement.id);
  newElement.classList.add('text-duplicate');
  document.body.appendChild(newElement);
}
function getTextWidth(inputValueElement) {
  const textDuplicateElement = document.querySelector(`[data-text-duplicate-for="${inputValueElement.id}"]`);
  textDuplicateElement.innerText = inputValueElement.value;
  if (textDuplicateElement.style.maxWidth != `${inputValueElement.offsetWidth}px`) {
    textDuplicateElement.style.maxWidth = `${inputValueElement.offsetWidth}px`;
  }
  return textDuplicateElement.offsetWidth;
}

function sendingCityOperations(cityElement, scriptOwner = false) {
  const sendingCity = cityElement.innerHTML,
        valueOutput = cityElement.parentElement.parentElement.parentElement.getElementsByClassName('js-calc-list-output')[0],
        values = getRecipientCitiesFor(sendingCity);
  valueOutput.innerHTML = sendingCity;
  outputAddressFrom.innerText = sendingCity;
  if (values.length > 0 && values.indexOf(recipientCityOutput.innerText) == -1) {
    outputAddressTo.innerHTML = 'Прибытие';
  }
  if (!scriptOwner) {
    insertValuesToList([
      {
        values : values,
        markedValues : getRecipientCitiesNotFor(sendingCity),
        list : recipientCitiesListElement,
        callback : recipientCityOperations,
        markedTitle : 'Нет доставки из города ' + sendingCity
      }
    ]);
  }
  doFormula();
}

function recipientCityOperations(cityElement, scriptOwner = false) {
  const recipientCity = cityElement.innerHTML,
        valueOutput = cityElement.parentElement.parentElement.parentElement.getElementsByClassName('js-calc-list-output')[0],
        values = getSendingCitiesFor(recipientCity);
  valueOutput.innerHTML = recipientCity;
  outputAddressTo.innerText = recipientCity;
  if (values.length > 0 && values.indexOf(sendingCityOutput.innerText) == -1) {
    outputAddressFrom.innerHTML = 'Отправление';
  }
  if (!scriptOwner) {
    insertValuesToList([
      {
        values : values,
        markedValues : getSendingCitiesNotFor(recipientCity),
        list : sendingCitiesListElement,
        callback : sendingCityOperations,
        markedTitle : 'Нет доставки в город ' + recipientCity
      }
    ]);
  }
  doFormula();
}

if (typeof calcFormula != 'undefined') {
  insertValuesToList([
    {
      values : getSendingCities(),
      list : sendingCitiesListElement,
      callback : sendingCityOperations
    },
    {
      values : getRecipientCities(),
      list : recipientCitiesListElement,
      callback : recipientCityOperations
    }
  ], 'init');
}

function insertValuesToList(allValues, init = false) {
  for (let i = 0; i < allValues.length; i++) {
    const valuesProperties = allValues[i],
          values = valuesProperties.values,
          markedValues = valuesProperties.markedValues || [],
          markedTitle = valuesProperties.markedTitle || 'Нет доставки',
          list = valuesProperties.list,
          valueOutput = list.getElementsByClassName('js-calc-list-output')[0],
          itemsOutput = list.getElementsByClassName('js-calc-list-items')[0];
    if (!init && values.length > 0 && values.indexOf(valueOutput.innerText) == -1) {
      deactivateListButton(list);
      valueOutput.innerHTML = '';
    }
    if (init && values.length == 1) {
      itemsOutput.innerHTML = '';
      const value = values[0],
            newElement = document.createElement('div');
      newElement.classList.add('calc__list-item');
      newElement.classList.add('js-calc-list-item');
      // newElement.setAttribute('onclick', `${valuesProperties.callback}(this);`);
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
          newElement.classList.add('calc__list-item');
          newElement.classList.add('calc__list-item_marked');
          newElement.classList.add('js-calc-list-item');
          newElement.setAttribute('title', markedTitle);
          // newElement.setAttribute('onclick', `${valuesProperties.callback}(this);`);
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
      if (init || (itemsOutput.innerHTML.indexOf(valueOutput.innerHTML) == -1)) {
        valueOutput.innerHTML = '';
      }
      itemsOutput.innerHTML = '';
      for (let valuesIteration = 0; valuesIteration < values.length; valuesIteration++) {
        const value = values[valuesIteration],
              newElement = document.createElement('div');
        newElement.classList.add('calc__list-item');
        newElement.classList.add('js-calc-list-item');
        // newElement.setAttribute('onclick', `${valuesProperties.callback}(this);`);
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
          newElement.classList.add('calc__list-item');
          newElement.classList.add('calc__list-item_marked');
          newElement.classList.add('js-calc-list-item');
          newElement.setAttribute('title', markedTitle);
          // newElement.setAttribute('onclick', `${valuesProperties.callback}(this);`);
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
}

const inputs = document.getElementsByClassName('js-calc-input');
for (let inputIteration = 0; inputIteration < inputs.length; inputIteration++) {
  const input = inputs[inputIteration],
        inputValueElement = input.getElementsByClassName('js-calc-input-value')[0],
        inputValueSign = input.getElementsByClassName('js-calc-input-value-sign')[0];
  
  createTextDuplicateElement(inputValueElement);
  input.addEventListener('click', () => {
    input.classList.remove('deactivated');
  });
  inputValueElement.addEventListener('focus', () => {
    input.classList.remove('deactivated');
  });
  input.addEventListener('keydown', e => {
    if (e.keyCode == 9 && inputValueElement.value == '') {
      input.classList.add('deactivated');
    }
  });
  document.addEventListener('click', e => {
    if (!input.classList.contains('deactivated') && inputValueElement.value == '' && checkThatCurrentElementExistsOutside(input, e.target)) {
      input.classList.add('deactivated');
    }
  });
  window.addEventListener('blur', () => {
    if (!input.classList.contains('deactivated') && inputValueElement.value == '') {
      input.classList.add('deactivated');
    }
  });
  inputValueElement.addEventListener('input', () => {
    if (inputValueSign && inputValueElement.value != '') {
      inputValueSign.style.left = `${Math.max(getTextWidth(inputValueElement), 0)}px`;
    }
    if (typeof calcFormula != 'undefined') {
      doFormula();
    }
  });
  
  if (typeof inputValueSign != 'undefined') {
    inputValueElement.addEventListener('keyup', () => {
      if (inputValueSign && inputValueElement.value != '' && inputValueSign.classList.contains('hidden')) {
        inputValueSign.classList.remove('hidden');
      } else if (inputValueSign && inputValueElement.value == '' && !inputValueSign.classList.contains('hidden')) {
        inputValueSign.classList.add('hidden');
      }
    });
  }
}


const lists = document.getElementsByClassName('js-calc-list'),
      listsBackground = document.getElementsByClassName('js-calc-lists-background')[0];

let listCanToggle = true;
for (let listIteration = 0; listIteration < lists.length; listIteration++) {
  const list = lists[listIteration],
        listButton = list.getElementsByClassName('js-calc-list-button')[0],
        items = list.getElementsByClassName('js-calc-list-item'),
        input = list.getElementsByClassName('js-calc-list-items-search')[0];
  
  listButton.addEventListener('click', () => {
    if (listCanToggle && !list.classList.contains('calc__list_one-item')) {
      if (list.classList.contains('list-disabled')) {
        list.classList.remove('list-disabled');
        setTimeout(() => {
          list.classList.remove('collapsed');
        }, 1);
        showCalcListsBackground();
        if (window.innerWidth > 768) {
          input.focus();
        }
      } else {
        closeItemsList(list);
      }
    }
  });
  document.addEventListener('click', e => {
    if (!list.classList.contains('collapsed') && checkThatCurrentElementExistsOutside(listButton, e.target) && document.activeElement.tagName != 'INPUT' && !e.target.classList.contains('calc__list-items-search')) {
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
      // selectItemInList(list);
      activeItem.click();
    }
  });
}

function deactivateListButton(list) {
  const button = list.getElementsByClassName('js-calc-list-button')[0];
  
  button.classList.add('deactivated');
}
function selectItemInList(list) {
  const items = list.getElementsByClassName('js-calc-list-item'),
        searchInput = list.getElementsByClassName('js-calc-list-items-search')[0],
        button = list.getElementsByClassName('js-calc-list-button')[0];
  
  button.classList.remove('deactivated');
  closeItemsList(list);
  setTimeout(() => {
    searchInput.value = '';
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
  hideCalcListsBackground();
}

function showCalcListsBackground() {
  listsBackground.classList.remove('disabled');
  setTimeout(() => {
    listsBackground.classList.remove('hidden');
  }, 1);
}
function hideCalcListsBackground() {
  listsBackground.classList.add('hidden');
  setTimeout(() => {
    listsBackground.classList.add('disabled');
    listCanToggle = true;
  }, 300);
}

const calcSearchInputs = document.getElementsByClassName('js-calc-list-items-search');
for (let calcSearchInputIteration = 0; calcSearchInputIteration < calcSearchInputs.length; calcSearchInputIteration++) {
  const input = calcSearchInputs[calcSearchInputIteration];
  input.addEventListener('input', () => {
    searchCity(input);
  });
}

function searchCity(searchElement) {
  const searchValue = searchElement.value.trim(),
        items = searchElement.parentElement.parentElement.getElementsByClassName('js-calc-list-item');
  
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