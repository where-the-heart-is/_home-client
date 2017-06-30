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

  const USER_URL = BASE_URL + `/api/v1/users/`
  const hrefLocation = window.location.href;
  const parsedQueryString = parseQueryString(hrefLocation);

  createRequestEndpoint(parsedQueryString);

  function createRequestEndpoint(id) {
    const ACCOUNT_URL = USER_URL + `${id}`;
    const PROFILE_URL = USER_URL + `${id}/profile`;
    createUserRequest(ACCOUNT_URL);
    createProfileRequest(PROFILE_URL);
  }

  // USER PROFILE REQUEST
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
      .then(showUserProfile)
      .catch(throwError)
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

  // USER ACCOUNT REQUEST
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
      .then(showUserProperty)
      .catch(throwError)
  }

  function showUserProperty(property) {
    const source = document.querySelector('#user-property-template').innerHTML;
    const template = Handlebars.compile(source);
    console.log(property);
    const html = template({property});
    const getProperty = document.querySelector('.property');
    const propertyDiv = document.createElement('div');
    propertyDiv.innerHTML = html;
    getProperty.appendChild(propertyDiv);
  }

  function createNewProperty() {

  }

});
