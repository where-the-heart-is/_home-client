document.addEventListener("DOMContentLoaded", function(event) {
  const NEWPROPERTY_URL = BASE_URL + `/api/v1/property/`

  function createNewProp() {
    const newProp = {
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
    const addNewPropBtn = getElementById('add-prop-button');
    addNewPropBtn.addEventListener('click', event => {
      event.preventDefault();
      const newProperty = createNewProp();
      console.log(newProperty);
    })
  }



    getNewPropData()
  });
