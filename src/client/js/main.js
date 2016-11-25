// *** create new poll *** //
$('#create-poll').on('submit', (event) => {
  event.preventDefault();
  const options = {
    url: '/api/v1/polls',
    data: { question: $('#question').val() },
    type: 'POST',
    dataType: 'json'
  };
  // update server
  $.ajax(options)
  .done((res) => {
    // handle success
    const link = `<a href="/polls/${res.data}">here</a>`;
    $('#question').val('');
    $('#create-poll').hide();
    $('#message').html(`Thanks. You can view your poll ${link}.`);
  })
  .fail((err) => {
    // handle error
    $('#message').html('Something bad happened. Try again.');
  });
});
