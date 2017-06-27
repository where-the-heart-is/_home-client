document.addEventListener("DOMContentLoaded", function(event) {

  const API_URL = `http://localhost:3000/api/v1/users/`
  const hrefLocation = window.location.href;
  const parsedQueryString = parseQueryString(hrefLocation);

  function parseQueryString(queryString) {
      queryString = queryString.split('=')
      return queryString[1];
  }

  createRequestEndpoint(parsedQueryString);

  function createRequestEndpoint(id) {
    const ACCOUNT_URL = API_URL + `${id}`;
    const PROFILE_URL = API_URL + `${id}/profile`;
    createUserRequest(ACCOUNT_URL);
    createProfileRequest(PROFILE_URL);
  }

  function createProfileRequest(PROFILE_URL) {
    const profileRequest = new Request(PROFILE_URL, {
      method: "get",
      mode: 'cors'
    })
    getProfileInformation(profileRequest)
  }

  function getProfileInformation(request) {
    fetch(request)
      .then(parseJSON)
      .then(returnProfileResponse)
      .catch(throwError)
  }

  function createUserRequest(ACCOUNT_URL) {
    const userRequest = new Request(ACCOUNT_URL, {
      method: "get",
      mode: 'cors'
    })
    getUserInformation(userRequest)
  }

  function getUserInformation(request) {
    fetch(request)
      .then(parseJSON)
      .then(returnPropertyResponse)
      .catch(throwError)
  }

  function parseJSON (response) {
    return response.json();
  }

  function throwError() {
    return new Error("Error")
  }

  function returnProfileResponse(response) {
    const profile = response;
    showUserProfile(profile)
  }

  function returnPropertyResponse(response) {
    const property = response;
    showUserProperty(property)
  }

  function showUserProfile(profile) {
    const source = document.querySelector('#user-profile-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template(profile);
    const getUser = document.querySelector('.profile');
    const userDiv = document.createElement('div');
    userDiv.innerHTML = html;
    getUser.appendChild(userDiv);
  }

  function showUserProperty(property) {
    const source = document.querySelector('#user-property-template').innerHTML;
    const template = Handlebars.compile(source);
    const html = template({property});
    const getProperty = document.querySelector('.property');
    const propertyDiv = document.createElement('div');
    propertyDiv.innerHTML = html;
    getProperty.appendChild(propertyDiv);
  }
});
