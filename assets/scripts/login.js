document.addEventListener("DOMContentLoaded", function(event) {
  redirectIfLoggedIn();

  const LOGIN_ENDPOINT = BASE_URL + `/auth/login`;

  function modalMovement() {
    $('#login-button').click(event => {
      $('#login-modal').modal();
    })

    $('#cancel-login').click(() => {
      $('#login-modal').modal('hide');
    })
  }
  modalMovement();

  function getUserForm() {
    const userLogin = {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-password').value
    }
    return userLogin;
  }

  function submitLoginForm() {
    const loginForm = document.getElementById('login');
    loginForm.addEventListener('click', event => {
      event.preventDefault();
      const userLogin = getUserForm();
      if (validPassword(userLogin.password) == true && validEmailAddress(userLogin.email) == true) {
        createLoginRequest(LOGIN_ENDPOINT, userLogin);
      } else {
        alert("Valid email and password required")
      }
    })
  }

  function createLoginRequest(LOGIN_ENDPOINT, userLogin) {
    const loginRequest = new Request(LOGIN_ENDPOINT, {
      method: "post",
      mode: 'cors',
      body: JSON.stringify(userLogin),
      credentials: 'include',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    login(loginRequest);
  }

  function login(request) {
    fetch(request)
    .then(parseJSON)
      .then(result => {
        console.log(result);
        localStorage.token = result.token;
        localStorage.user_id = result.id;
        localStorage.is_landlord = result.is_landlord;
        setIdRedirect(result)
      })
      .catch(throwError)
  }

  submitLoginForm();

})
