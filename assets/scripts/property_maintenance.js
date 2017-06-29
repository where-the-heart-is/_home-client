$(() => {

  let BASE_URL = '';
  function getBaseURL() {
    if (window.location.hostname == "localhost") {
      BASE_URL = `http://localhost:3000`;
    } else {
      BASE_URL = `https://rocky-shelf-87257.herokuapp.com`
    }
  }

  getBaseURL();

  const PROPERTY_ENDPOINT = BASE_URL + `/api/v1/property/`
  const hrefLocation = window.location.href;
  const parsedQueryString = parseQueryString(hrefLocation);
  const MAINTENANCE_ENDPOINT = BASE_URL + `/api/v1/property/${parsedQueryString}/maintenance/`
  const PROPERTY_PAGE_URL =`/account/property.html?property_id=${parsedQueryString}`

  function maintananceClickHandlers() {
    $('#maintenance-btn').click(event => {
      event.preventDefault();
      $('#maintenance-add').modal();
    })

    $('#add-maintenance').click(() => {
      let newMaintenance = createMaintenanceObject();
      createAddMaintenanceRequest(MAINTENANCE_ENDPOINT, newMaintenance)
      window.location = PROPERTY_PAGE_URL;
    });

    $('.edit-doc-button').click(function() {
      maintenanceId = $(this).data('id');
      $('#maintenance-edit').modal();
    });

    $('#edit-maintenance').click(function() {
      let editedMaintenance = createEditedMaintenanceObject();
      console.log(editedDocument);
      createEditedMaintenanceRequest(MAINTENANCE_ENDPOINT, editedDocument)
    });

    $('#delete-doc-button').click(function() {
      const deleteDocRequest = createDeleteMaintenanceRequest(MAINTENANCE_ENDPOINT);
      console.log(deleteMaintenanceRequest);
      processRequest(deleteMaintenanceRequest);
      window.location = PROPERTY_PAGE_URL;
    })
  }

  // DOCUMENT AND MAINTENANCE REQUEST
  function createMainRequest(MAINTENANCE_ENDPOINT) {
    console.log(MAINTENANCE_ENDPOINT);
    const propertyRequest = new Request(MAINTENANCE_ENDPOINT, {
      method: "get",
      mode: "cors"
    })
    getMainInformation(propertyRequest)
  }

  createMainRequest(MAINTENANCE_ENDPOINT)

  function getMainInformation(request) {
    fetch(request)
      .then(parseJSON)
      .then(showMain)
      .then(json => {
        // return window.location = PROPERTY_PAGE_URL
        // return json;
      })
      .catch(throwError)
  }

  function showMain(maintenance) {
    const source = document.querySelector('#maintenance-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({maintenance: [maintenance]});
    console.log(maintenance);
    const getMain = document.querySelector('.maintenance');
    const maintenanceDiv = document.createElement('div');
    maintenanceDiv.classList.add("dash-container");
    maintenanceDiv.innerHTML = html;
    getMain.appendChild(maintenanceDiv);
    console.log(maintenance.title);
    maintenanceClickHandlers();
  }

})
