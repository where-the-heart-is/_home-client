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
      .then(returnPropInfo)
      .catch(throwError)
  }
  function returnPropInfo(response){
    console.log(response);
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
      .then(returnTenantInfo)
      .catch(throwError)
  }

  function returnTenantInfo(response) {
    console.log(response);
  }

  // DOCUMENT REQUEST
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
      .then(returnDocs)
      .catch(throwError)
  }

  function returnDocs(response) {
    const propertyDocs = response;
    console.log(response);
    showPropertyDocsandMain(propertyDocs);
  }

  function showPropertyDocsandMain(documents) {
    const source = document.querySelector('#single-property=temlate').innerHTML;
    const template = Handlebars.compile(source);
    console.log(documents);
    const html = template({documents});
    const getDocs = document.querySelector('.documents');
    const documentDiv = document.createElement('div');
    documentDiv.innerHTML = html;
    getDocs.appendChild(documentDiv);
  }

})
