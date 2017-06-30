document.addEventListener("DOMContentLoaded", function(event) {
  let documentId = 0;
  let removedTenant = 0;

  const PROPERTY_ENDPOINT = BASE_URL + `/api/v1/property/`
  const hrefLocation = window.location.href;
  const parsedQueryString = parseQueryString(hrefLocation);
  createPropertyEndpoint(parsedQueryString);
  const DOCUMENT_ENDPOINT = BASE_URL + `/api/v1/property/${parsedQueryString}/documents/`
  const PROPERTY_PAGE_URL =`/account/property.html?property_id=${parsedQueryString}`
  const TENANTS_URL =`${BASE_URL}/api/v1/property/${parsedQueryString}/tenants`


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
    showHideFeatures();
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
    const getTenant = document.querySelector('.tenants');
    const tenantDiv = document.createElement('div');
    tenantDiv.classList.add("dash-container");
    tenantDiv.innerHTML = html;
    getTenant.appendChild(tenantDiv);
    deleteTenantOnClick();
    showHideFeatures();
  }

  function deleteTenantOnClick() {
    $('.delete-tenant').click(function(event) {
      removedTenant = $(this).data('id');
      console.log(TENANTS_URL);
      const deleteTenantRequest = createDeleteTenantRequest(TENANTS_URL);
      processRequest(deleteTenantRequest)
    });


    // console.log(DOCUMENT_ENDPOINT);

  }

  function createDeleteTenantRequest(url) {
    const deleteBody = {
      id: removedTenant,
      property_id: parsedQueryString
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
    documentDiv.innerHTML = html;
    getDocs.appendChild(documentDiv);
    docClickHandlers();
    showHideFeatures();
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
      $('#document-edit').modal();
    });

    $('#edit-document').click(function() {
      let editedDocument = createEditedDocumentObject();
      console.log(editedDocument);
      createEditedDocumentRequest(DOCUMENT_ENDPOINT, editedDocument)
    });

    $('#delete-doc-button').click(function() {
      const deleteDocRequest = createDeleteDocumentRequest(DOCUMENT_ENDPOINT);
      console.log(deleteDocRequest);
      processRequest(deleteDocRequest)
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

  function createDeleteDocumentRequest(url) {
    const deleteBody = {
      id: documentId
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

  function processRequest(request) {
    // console.log('request sent!');
    fetch(request)
      .then(res => {
        // console.log(res);
        res.json()
          .then(json => {
            return window.location = PROPERTY_PAGE_URL
            // return json;
          })
      })
      .catch(throwError)
  }

})
