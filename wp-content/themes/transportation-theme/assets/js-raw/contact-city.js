const contactCityButtons = document.getElementsByClassName('js-contact-city-button');
const contactCityOutputs = document.getElementsByClassName('js-contact-city-output');
let currentContactCity = detectCurrentContactCity();

addCallbackToOpenOfPopUp('contact_cities', function(popUp, popUpButton = undefined) {
  popUpButton && popUpButton.classList.add('active');
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

function insertContactCitiesToList() {
  insertValuesToList({
    values : contactCitiesData.filter(contactCity => {
      return contactCity['name'] !== currentContactCity;
    }).map(contactCity => {
      return contactCity['name'];
    }),
    list : detectPopUpInVariable('contact_cities'),
    callback : (elementOnPage) => changeContactCity(elementOnPage)
  });
}
insertContactCitiesToList();

function changeContactCity(elementOnPage) {
  const newCity = elementOnPage.innerText.trim();
  const outputCity = (function() {
    if (newCity.length <= 15) return newCity;
    return `${newCity.substring(0, 12)}...`;
  }());
  currentContactCity = newCity;
  for (let i = 0; i < contactCityOutputs.length; i++) {
    const contactCityOutput = contactCityOutputs[i];
    contactCityOutput.innerText = outputCity;
  }
  for (let i = 0; i < contactCityButtons.length; i++) {
    const contactCityButton = contactCityButtons[i];
    contactCityButton.setAttribute('data-contact-city', newCity);
  }
  setTimeout(() => {
    insertContactCitiesToList();
  }, 0);
}

function detectCurrentContactCity() {
  return contactCityButtons[0].getAttribute('data-contact-city').trim();
}