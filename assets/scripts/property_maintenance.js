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
  let maintenanceId = 0;

  function maintenanceClickHandlers() {
    $('#main-button').click(function(event) {
      event.preventDefault();
      $('#maintenance-add').modal();
    })

    $('#add-maintenance').click(() => {
      let newMaintenance = createMaintenanceObject();
      createAddMaintenanceRequest(MAINTENANCE_ENDPOINT, newMaintenance)
      // window.location = PROPERTY_PAGE_URL;
    });

    $('.edit-maint-button').click(function() {
      maintenanceId = $(this).data('id');
      console.log('FUcky');
      $('#maintenance-edit').modal();
    });

    $('#edit-maintenance').click(function() {
      let editedMaintenance = createEditedMaintenanceObject();
      console.log(editedDocument);
      // createEditedMaintenanceRequest(MAINTENANCE_ENDPOINT, editedDocument)
    });

    $('#delete-main-button').click(function() {
      const deleteDocRequest = createDeleteMaintenanceRequest(MAINTENANCE_ENDPOINT);
      console.log(deleteMaintenanceRequest);
      processRequest(deleteMaintenanceRequest);
      window.location = PROPERTY_PAGE_URL;
    })
  }

  // MAINTENANCE REQUEST

  function createMaintenanceObject() {
    return {
      title: $('#maintenance-title').val(),
      request: $('#maintenance-desc').val(),
      status: $('#maintenance-status').val(),
      property_id: parsedQueryString,
      tenant_id: localStorage.user_id
    }
  }

  function createMainRequest(MAINTENANCE_ENDPOINT) {
    console.log(MAINTENANCE_ENDPOINT);
    const propertyRequest = new Request(MAINTENANCE_ENDPOINT, {
      method: "get",
      mode: "cors"
    })
    getMainInformation(propertyRequest)
  }

  function createAddMaintenanceRequest (url, newMaintenance) {
    const maintRequest = new Request (url, {
      method: "post",
      mode: 'cors',
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMaintenance)
    });
    processRequest(maintRequest)
  }

  function createDeleteMaintenanceRequest(url) {
    const deleteBody = {
      id: maintenanceId
    }
    const request = new Request(url, {
      method: "delete",
      body: JSON.stringify(deleteBody),
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    });
    return request;
  }

  createMainRequest(MAINTENANCE_ENDPOINT)

  function getMainInformation(request) {
    fetch(request)
      .then(parseJSON)
      .then(showMain)
      .then(json => {
        console.log(json);
        // return window.location = PROPERTY_PAGE_URL
        // return json;
      })
      .catch(throwError)
  }

  function showMain(maintenance) {
    const source = document.querySelector('#maintenance-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({maintenance});
    console.log({maintenance: [maintenance]});
    const getMain = document.querySelector('.maintenance');
    const maintenanceDiv = document.createElement('div');
    maintenanceDiv.classList.add("dash-container");
    maintenanceDiv.innerHTML = html;
    getMain.appendChild(maintenanceDiv);
    maintenanceClickHandlers();
  }

  function processRequest(request) {
    console.log('request sent!');
    fetch(request)
      .then(res => {
        res.json()
          .then(json => {
            return window.location = PROPERTY_PAGE_URL
            // return json;
          })
      })
      .catch(throwError)
  }

})
