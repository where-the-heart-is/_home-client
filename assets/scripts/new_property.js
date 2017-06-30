document.addEventListener("DOMContentLoaded", function(event) {
  const NEWPROPERTY_URL = BASE_URL + `/api/v1/property/`

  function createNewProp() {
    const newProp = {
      landlord_id: parseInt(localStorage.user_id),
      address: document.getElementById('new-address').value,
      rent_price: parseInt(document.getElementById('new-rent').value),
      bedrooms: document.getElementById('new-bedrooms').value,
      bathrooms: document.getElementById('new-bathrooms').value,
      square_footage: document.getElementById('new-square-footage').value,
      image: document.getElementById('new-image').value,
      location: {
        city: document.getElementById('new-city').value,
        state: document.getElementById('new-state').value,
        zip_code: document.getElementById('new-zip').value
      }
    }
    return newProp;
  }

  function getNewPropData() {
    const addNewPropBtn = document.getElementById('add-prop-button');
    addNewPropBtn.addEventListener('click', event => {
      event.preventDefault();
      const newProperty = createNewProp();
      addNewProperty(NEWPROPERTY_URL, newProperty)
    })
  }

  function addNewProperty(NEWPROPERTY_URL, newProperty) {
    const request = new Request(NEWPROPERTY_URL, {
      method: "post",
      mode: 'cors',
      body: JSON.stringify(newProperty),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    createProperty(request)
  }

  function createProperty(request) {
    fetch(request)
    .then(parseJSON)
      .then(result => {
        setIdRedirect(result)
      })
      .catch(throwError)
  }

  getNewPropData()
});
