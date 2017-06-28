document.addEventListener("DOMContentLoaded", function(event) {
  const PROPERTY_ENDPOINT = `https://rocky-shelf-87257.herokuapp.com/api/v1/property/`
  const hrefLocation = window.location.href;
  const parsedQueryString = parseQueryString(hrefLocation);
  createPropertyEndpoint(parsedQueryString);

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
    const getTenant = document.querySelector('.tenants');
    const tenantDiv = document.createElement('div');
    tenantDiv.classList.add("dash-container");
    tenantDiv.innerHTML = html;
    getTenant.appendChild(tenantDiv);
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
  }

})
