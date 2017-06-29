document.addEventListener("DOMContentLoaded", function(event) {
  let BASE_URL = '';

  function getBaseURL() {
    if (window.location.hostname == "localhost") {
      BASE_URL = `http://localhost:3000/auth`;
    } else {
      BASE_URL = `https://rocky-shelf-87257.herokuapp.com`
    }
  }
  getBaseURL();

  const NEWACCOUNT_ENDPOINT = BASE_URL + `/signup`;

  function modalMovement() {
    $('#login-button').click(event => {
      $('#login-modal').modal();
    })

    $('#cancel-login').click(() => {
      $('#login-modal').modal('hide');
    })

    $('#signup-button').click(event => {
      $('#signup-modal').modal();
    })

    $('#cancel-signup').click(() => {
      $('#signup-modal').modal('hide');
    })
  }

  modalMovement();

  redirectIfLoggedIn();

  function getSignUpFormData() {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', event => {
      event.preventDefault();
      const newAccount = {
        first_name: document.getElementById('new-account-first_name').value,
        last_name: document.getElementById('new-account-last_name').value,
        email: document.getElementById('new-account-email').value,
        password: document.getElementById('new-account-password').value,
        is_landlord: document.getElementById('new-account-is_landlord').value
      }
      if (validPassword(newAccount.password) == true && validEmailAddress(newAccount.email) == true) {
        createUserRequest(NEWACCOUNT_ENDPOINT, newAccount);
      } else {
        alert("Valid email and password required")
      }
    })
  }

  function createUserRequest(NEWACCOUNT_ENDPOINT, newAccount) {
    console.log(NEWACCOUNT_ENDPOINT);

    const request = new Request(NEWACCOUNT_ENDPOINT, {
      method: "POST",
      mode: 'cors',
      body: JSON.stringify(newAccount),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    createNewUser(request);
  }

  function createNewUser(request) {
    return fetch(request)
      .then(signUpCheckStatus)
      .then(parseJSON)
      .then(result => {
        if (result.message == "Email is already in use") {
          alert("Email is already in use")
        } else {
          alert("New User Created");
          window.location = `/account/user.html?id=${result.id}`
        }
      })
      .catch(throwError)
  }

  function signUpCheckStatus(response) {
    if (!response.ok) {
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    } else {
      return response
    }
  }

  getSignUpFormData();

});
