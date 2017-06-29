document.addEventListener("DOMContentLoaded", function(event) {
  let BASE_URL = '';
  const NEWACCOUNT_ENDPOINT = BASE_URL + `/auth/signup`;
  let newAccount = {};
  function getBaseURL() {
    if (window.location.hostname == "localhost") {
      BASE_URL = `http://localhost:3000`;
    } else {
      BASE_URL = `https://rocky-shelf-87257.herokuapp.com`
    }
  }

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

  function getSignUpFormData() {
    const signupForm = document.querySelector('#signup');
    signupForm.addEventListener('click', event => {
      event.preventDefault();
      const first_name = document.getElementById('new-account-first_name').value
      const last_name = document.getElementById('new-account-last_name').value
      const email = document.getElementById('new-account-email').value
      const password = document.getElementById('new-account-password').value
      let is_landlord;
      if (!document.getElementById('new-account-is_landlord').value) {
        return is_landlord = false
      } else {
        return is_landlord = true
      }
      newAccount = {
        first_name,
        last_name,
        email,
        password,
        is_landlord
      }
    })
    createUserRequest(NEWACCOUNT_ENDPOINT, newAccount);
  }

  function createUserRequest(NEWACCOUNT_ENDPOINT, newAccount) {
    const request = new Request(NEWACCOUNT_ENDPOINT, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAccount)
    })
    createNewUser(request);
  }

  function createNewUser(request) {
    return fetch(request)
      .then(res => {
        return res.json();
      })
      .catch(throwError)
  }

  // getSignUpFormData();

});
