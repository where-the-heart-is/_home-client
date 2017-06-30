document.addEventListener("DOMContentLoaded", function(event) {
  redirectIfLoggedIn();

  const NEWACCOUNT_ENDPOINT = BASE_URL + `/auth/signup`;

  function modalMovement() {
    $('#signup-button').click(event => {
      $('#signup-modal').modal();
    })

    $('#cancel-signup').click(() => {
      $('#signup-modal').modal('hide');
    })
  }

  modalMovement();

  function getSignUpFormData() {
    const signupForm = document.getElementById('signup');
    signupForm.addEventListener('click', event => {
      event.preventDefault();
      const newAccount = {
        first_name: document.getElementById('new-account-first_name').value,
        last_name: document.getElementById('new-account-last_name').value,
        email: document.getElementById('new-account-email').value,
        password: document.getElementById('new-account-password').value,
        is_landlord: document.getElementById('new-account-is_landlord').value
      }
      console.log(newAccount);
      if (validPassword(newAccount.password) == true && validEmailAddress(newAccount.email) == true) {
        createUserRequest(NEWACCOUNT_ENDPOINT, newAccount);
      } else {
        alert("Valid email and password required")
      }
    })
  }

  function createUserRequest(NEWACCOUNT_ENDPOINT, newAccount) {
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
        console.log(result);
        localStorage.token = result.token;
        localStorage.user_id = result.id;
        localStorage.is_landlord = result.is_landlord;
        if (result.message == "Email is already in use") {
          alert("Email is already in use")
        } else {
          setIdRedirect(result)
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
