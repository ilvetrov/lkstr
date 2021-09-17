const contactCityButtons = document.getElementsByClassName('js-contact-city-button');
const contactCityOutputs = document.getElementsByClassName('js-contact-city-output');
const contactCityOutputsWithPseudo = Array.from(document.querySelectorAll('[data-pseudo-city]')).map(element => element.getElementsByClassName('js-contact-city-output')[0]);
let currentContactCity = detectCurrentContactCity();

addCallbackToOpenOfPopUp('contact_cities', function(popUp, popUpButton = undefined) {
  if (popUpButton) popUpButton.classList.add('active');
  insertContactCitiesToList(
    popUpButton && popUpButton.innerText === generalEmployeesName,
    popUpButton && popUpButton.hasAttribute('data-pseudo-city'),
    popUpButton && popUpButton.hasAttribute('data-values') && JSON.parse(popUpButton.getAttribute('data-values'))
  );
});

addCallbackToHideOfPopUp('contact_cities', function(popUp, popUpButton = undefined) {
  if (popUpButton) {
    popUpButton.classList.remove('active');
  } else {
    for (let i = 0; i < contactCityButtons.length; i++) {
      const contactCityButton = contactCityButtons[i];
      contactCityButton.classList.remove('active');
    }
  }
});

function insertContactCitiesToList(currentIsGeneral, hasGeneral, values) {
  let localContactCitiesData = contactCitiesData;
  if (values) localContactCitiesData = values;
  insertValuesToList({
    values : (function() {
      const cities = localContactCitiesData.filter(contactCity => {
        if (hasGeneral && currentIsGeneral && contactCity['code_name'].trim() === 'general') return false;
        if (hasGeneral && currentIsGeneral) return true;
        return contactCity['name'] !== currentContactCity;
      }).map(contactCity => {
        if (hasGeneral) return contactCity['name'];
        return contactCity['name'];
      });
      if (hasGeneral && !currentIsGeneral && !values) {
        cities.unshift(generalEmployeesName);
      }
      return cities;
    }()),
    list : detectPopUpInVariable('contact_cities'),
    callback : (elementOnPage) => changeContactCity(elementOnPage)
  });
}
insertContactCitiesToList();

function changeContactCity(elementOnPage) {
  const newCity = elementOnPage.innerText.trim();
  const outputCity = trimCityName(newCity);
  setCookie('selected_city', nameToCode(newCity), 8760);
  if (newCity !== generalEmployeesName) {
    currentContactCity = newCity;
    changeCityInButtons(newCity, outputCity);
  } else {
    for (let i = 0; i < contactCityOutputsWithPseudo.length; i++) {
      const contactCityOutput = contactCityOutputsWithPseudo[i];
      contactCityOutput.innerText = generalEmployeesName;
    }

  }
  setTimeout(() => {
    changeCityValues(newCity);
  }, 0);
}

function changeCityInButtons(newCity, outputCity) {
  for (let i = 0; i < contactCityOutputs.length; i++) {
      const contactCityOutput = contactCityOutputs[i];
      contactCityOutput.innerText = outputCity;
    }
    for (let i = 0; i < contactCityButtons.length; i++) {
      const contactCityButton = contactCityButtons[i];
      contactCityButton.setAttribute('data-contact-city', newCity);
    }
}

function changeCityValues(newCity) {
  const codeName = contactCitiesData.find(contactCity => {
    return contactCity.name === newCity;
  })?.code_name;
  {
    const elements = document.querySelectorAll('[data-cities-values]');
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const properties = JSON.parse(element.getAttribute('data-cities-values'))[codeName];
      for (const propertyNameRaw in properties) {
        if (Object.hasOwnProperty.call(properties, propertyNameRaw)) {
          const propertyValue = properties[propertyNameRaw];
          const specialMatch = propertyNameRaw.match(/^(.+?)--/);
          const special = (specialMatch ?? [])[1];
          const propertyName = specialMatch ? propertyNameRaw.replace(/^(.+?)--/, '') : propertyNameRaw;
          switch (propertyName) {
            case 'innerText':
              element.innerText = propertyValue;
              break;
          
            default:
              element.hasAttribute('data-not-smooth-changing') && element.classList.add('undefined-transition');
              element.setAttribute(propertyName, propertyValue);
              setTimeout(() => {
                element.hasAttribute('data-not-smooth-changing') && element.classList.remove('undefined-transition');
              }, 200);
              break;
          }
          switch (special) {
            case 'remove-empty':
              if (!propertyValue) {
                element.removeAttribute(propertyName);
              }
              break;
          
            default:
              break;
          }
        }
      }
    }
  }
  {
    const elements = document.querySelectorAll(`[data-show-only-on-city]`);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      const elementCity = element.getAttribute('data-show-only-on-city');
      if (elementCity === codeName) {
        element.classList.remove('disabled');
      } else {
        element.classList.add('disabled');
      }
    }
  }
  {
    const groups = document.querySelectorAll('[data-contact-city-group]');
    for (let groupIteration = 0; groupIteration < groups.length; groupIteration++) {
      const groupElement = groups[groupIteration];
      const groupName = groupElement.getAttribute('data-contact-city-group');
      const localDefaultCity = groupElement.getAttribute('data-contact-city-default')?.trim() ?? defaultCityCodeName;
      const groupedElements = document.querySelectorAll(`[data-show-on-contact-city-group="${groupName}"]`);
      const elementForShowing = Array.from(groupedElements).find(element => element.getAttribute('data-show-on-contact-city').trim() === codeName) ?? (!groupElement.hasAttribute('data-contact-city-no-default') ? Array.from(groupedElements).find(element => element.getAttribute('data-show-on-contact-city').trim() === localDefaultCity) : undefined);
      let wasShown = false;
      for (let elementIteration = 0; elementIteration < groupedElements.length; elementIteration++) {
        const element = groupedElements[elementIteration];
        if (element === elementForShowing) {
          if (groupElement.hasAttribute('data-contact-city-changing-delay')) {
            setTimeout(() => {
              showBlock(element);
            }, Number(groupElement.getAttribute('data-contact-city-changing-delay')));
          } else {
            showBlock(element);
          }
          wasShown = true;
        } else {
          hideBlock(element);
        }
      }
    }
  }
}

function trimCityName(name) {
  if (name.length <= 15) return name;
  return `${name.substring(0, 12)}...`;
}

function detectCurrentContactCity() {
  return contactCityButtons[0].getAttribute('data-contact-city').trim();
}

function showBlock(block) {
  block.classList.remove('hidden');
  if (typeof block.onShow !== 'undefined') {
    block.onShow();
    delete block.onShow;
  }
}

function hideBlock(block) {
  block.classList.add('hidden');
}

function codeToName(codeName) {
  if ((codeName.trim()) === 'general') return generalEmployeesName;
  return contactCitiesData.find(contactCity => {
    return contactCity.code_name === codeName;
  })?.name;
}

function nameToCode(name) {
  return contactCitiesData.find(contactCity => {
    return contactCity.name === name;
  })?.code_name;
}