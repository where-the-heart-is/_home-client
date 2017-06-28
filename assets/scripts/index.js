$(() => {

  $('#login-button').click(event => {
    $('.modal').modal();
  })

  $('.cancel-button').click(() => {
    $('.modal').modal('hide');
  })
});
