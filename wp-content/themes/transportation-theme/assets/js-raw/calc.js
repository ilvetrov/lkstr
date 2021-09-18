const formulaAliases = {
  WVC : getWeightPriceOrVolumePrice,
  WC : getWeightPrice,
  VC : getVolumePrice,
  WV : getWeightOrVolume,
  V : getVolumeForOperations,
  W : getWeight,
};
const sendingCitiesListElement = document.getElementsByClassName('js-calc-sending-cities')[0];
const recipientCitiesListElement = document.getElementsByClassName('js-calc-recipient-cities')[0];
const sendingCityOutput = document.getElementsByClassName('js-calc-sending-city-output')[0];
const recipientCityOutput = document.getElementsByClassName('js-calc-recipient-city-output')[0];
const weightElement = document.getElementsByClassName('js-calc-input-weight')[0];
const volumeElement = document.getElementsByClassName('js-calc-input-volume')[0];
const outputAddressFrom = document.getElementsByClassName('js-calc-address-from')[0];
const outputAddressTo = document.getElementsByClassName('js-calc-address-to')[0];
const outputVolume = document.getElementsByClassName('js-calc-volume')[0];
const outputWeight = document.getElementsByClassName('js-calc-weight')[0];
const outputTotalCost = document.getElementsByClassName('js-calc-total-cost')[0];
const symbolOfVolume = document.getElementsByClassName('js-calc-volume-symbol')[0];
const symbolOfWeight = document.getElementsByClassName('js-calc-weight-symbol')[0];
const calcStatus = document.getElementsByClassName('js-calc-status')[0];
const calcStatusOutput = document.getElementsByClassName('js-calc-status-output')[0];

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
  return weight / getVolumeForOperations(volume) > densityThreshold;
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
    insertValuesToList({
      values : values,
      markedValues : getRecipientCitiesNotFor(sendingCity),
      list : recipientCitiesListElement,
      callback : recipientCityOperations,
      markedTitle : 'Нет доставки из города ' + sendingCity
    });
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
    insertValuesToList({
      values : values,
      markedValues : getSendingCitiesNotFor(recipientCity),
      list : sendingCitiesListElement,
      callback : sendingCityOperations,
      markedTitle : 'Нет доставки в город ' + recipientCity
    });
  }
  doFormula();
}

if (typeof calcFormula != 'undefined') {
  insertValuesToList({
    values : getSendingCities(),
    list : sendingCitiesListElement,
    callback : sendingCityOperations
  }, 'init');
  insertValuesToList({
    values : getRecipientCities(),
    list : recipientCitiesListElement,
    callback : recipientCityOperations
  }, 'init');
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