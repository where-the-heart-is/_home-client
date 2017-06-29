let BASE_URL = '';

function getBaseURL() {
  if (window.location.hostname == "localhost") {
    BASE_URL = `http://localhost:3000`;
  } else {
    BASE_URL = `https://rocky-shelf-87257.herokuapp.com`
  }
}
getBaseURL();

function parseQueryString(queryString) {
    queryString = queryString.split('=')
    return queryString[1];
}

function parseJSON (response) {
  return response.json();
}

function throwError(res) {
  return new Error("Error")
}

function confirmation(res) {
  console.log('Completed!');
  return res.json();
}

// Validation for email address
function validEmailAddress(useremail) {
  const filter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (filter.test(useremail)) {
    return true;
  } else {
    return false;
  }
}

// Validation for password, Password must contain be 8-16 charachters, contain 1 upper and lower case, 1 numeric and a special character
function validPassword(userPassword) {
  const password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
  if (userPassword.match(password)) {
    return true;
  } else {
    return false;
  }
}

function setIdRedirect(result){
  localStorage.user_id = result.id;
  window.location = `/account/user.html?id=${result.id}`
}


function redirectIfLoggedIn(){
  if(localStorage.user_id){
    window.location = `/account/user.html?id=${localStorage.user_id}`
  }
}

if (localStorage.is_landlord) {
  $('.landlord').show();
} else {
  $('.landlord').hide();
}

if(!localStorage.is_landlord) {
  $('.tenant').show();
} else {
  $('.tenant').hide();
}

function logout(){
  localStorage.removeItem('user_id')
  $.get(`/logout`)
    .then(result => {
      console.log(result);
      window.location = '/index.html'
    })
}
