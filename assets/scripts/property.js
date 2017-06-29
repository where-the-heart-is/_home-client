document.addEventListener("DOMContentLoaded", function(event) {

  let BASE_URL = '';
  function getBaseURL() {
    if (window.location.hostname == "localhost") {
      BASE_URL = `http://localhost:3000`;
    } else {
      BASE_URL = `https://rocky-shelf-87257.herokuapp.com`
    }
  }



  getBaseURL();

  let documentId = 0;

  const PROPERTY_ENDPOINT = BASE_URL + `/api/v1/property/`
  const hrefLocation = window.location.href;
  const parsedQueryString = parseQueryString(hrefLocation);
  createPropertyEndpoint(parsedQueryString);
  const DOCUMENT_ENDPOINT = BASE_URL + `/api/v1/property/${parsedQueryString}/documents/`

  function createPropertyEndpoint(id) {
    const DOC_MAIN_ID_URL = PROPERTY_ENDPOINT + `${id}/documents`;
    const TENANTS_URL = PROPERTY_ENDPOINT + `${id}/tenants`;
    const PROPERTY_URL = PROPERTY_ENDPOINT + `${id}`;
    createDocRequest(DOC_MAIN_ID_URL);
    createTenantRequest(TENANTS_URL);
    createPropRequest(PROPERTY_URL);
  }
  // PROPERTY REQUEST
  function createPropRequest(url) {
    const propRequest = new Request(url, {
      method: "get",
      mode: 'cors'
    })
    getPropertyInfo(propRequest)
  }

  function getPropertyInfo(request) {
    fetch(request)
      .then(parseJSON)
      .then(showSingleProp)
      .catch(throwError)
  }

  function showSingleProp(property) {
    const source = document.querySelector('#single-property-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(property[0]);
    const getProperty = document.querySelector('.property');
    const propertyDiv = document.createElement('div');
    propertyDiv.classList.add("dash-container");
    propertyDiv.innerHTML = html;
    getProperty.appendChild(propertyDiv);
  }

  // TENANT REQUEST
  function createTenantRequest(url) {
    const tenantRequest = new Request(url, {
      method: "get",
      mode: "cors"
    })
    getTenantInfo(tenantRequest);
  }

  function getTenantInfo(request) {
    fetch(request)
      .then(parseJSON)
      .then(showTenants)
      .catch(throwError)
  }

  function showTenants(tenants) {
    const source = document.querySelector('#tenants-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({tenants});
    console.log(tenants);
    const getTenant = document.querySelector('.tenants');
    const tenantDiv = document.createElement('div');
    tenantDiv.classList.add("dash-container");
    tenantDiv.innerHTML = html;
    getTenant.appendChild(tenantDiv);
    deleteTenantOnClick();
  }

  function deleteTenantOnClick() {
    $('.delete-tenant').click(function(event) {
      const removedTenant = $(this).data('id');
      console.log(removedTenant);
    });
  }

  // DOCUMENT AND MAINTENANCE REQUEST
  function createDocRequest(DOC_MAIN_ID_URL) {
    const propertyRequest = new Request(DOC_MAIN_ID_URL, {
      method: "get",
      mode: "cors"
    })
    getDocInformation(propertyRequest)
  }

  function getDocInformation(request) {
    fetch(request)
      .then(parseJSON)
      .then(showDocsAndMain)
      .catch(throwError)
  }

  function showDocsAndMain(documents) {
    const source = document.querySelector('#single-doc-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({documents});
    const getDocs = document.querySelector('.documents');
    const documentDiv = document.createElement('div');
    documentDiv.classList.add("dash-container");
    documentDiv.innerHTML = html;
    getDocs.appendChild(documentDiv);
    docClickHandlers();
  }

  function docClickHandlers() {
    $('#document-btn').click(event => {
      event.preventDefault();
      $('#document-add').modal();
    })

    $('#add-document').click(() => {
      let newDocument = createDocumentObject();
      createAddDocumentRequest(DOCUMENT_ENDPOINT, newDocument)
    });

    $('.edit-doc-button').click(function() {
      documentId = $(this).data('id');
      console.log(this);
      console.log(documentId);
      $('#document-edit').modal();
    });

    $('#edit-document').click(function() {
      let editedDocument = createEditedDocumentObject();
      console.log(editedDocument);
      createEditedDocumentRequest(DOCUMENT_ENDPOINT, editedDocument)
    });

    $('#delete-doc-button').click(function() {
      deleteDocumentRequest(DOCUMENT_ENDPOINT);
    })
  }

  function createDocumentObject() {
    return {
      title: $('#document-title').val(),
      created_on: new Date(),
      document_url: $('#document-url').val(),
      property_id: parsedQueryString
    };
  }

  function createEditedDocumentObject() {
    return {
      id: documentId,
      title: $('#edit-title').val(),
      created_on: new Date(),
      document_url: $('#edit-url').val(),
      property_id: parsedQueryString
    };
  }

  function createAddDocumentRequest(url, newDocument) {
    const documentRequest = new Request (url, {
      method: "post",
      mode: 'cors',
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDocument)
    });
    processRequest(documentRequest)
  }

  function createEditedDocumentRequest(url, editedDocument) {
    const documentRequest = new Request (url, {
      method: "put",
      mode: 'cors',
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedDocument)
    });
    processRequest(documentRequest)
  }

  function deleteDocumentRequest(url) {
    const deleteBody = {
      id: documentId
    }

    const request = new Request(url, {
      method: "delete",
      body: JSON.stringify(deleteBody)
    })
  }

  function deleteTenantRequest(TENANTS_URL) {

    const deleteBody = {
      id: removedTenant,
      property_id: parsedQueryString

    }

    const request = new Request(TENANTS_URL, {
      method: "delete",
      body: JSON.stringify(deleteBody)
    })
  }

  function processRequest(request) {
    console.log('going!');
    fetch(request)
      .then(res => {
        res.json()
          .then(json => {
            return json;
          })
      })
      .catch(throwError)
  }

})
