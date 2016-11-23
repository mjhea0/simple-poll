$('#create-poll').on('submit', (event) => {
  event.preventDefault();
  const options = {
    url: '/api/v1/polls',
    data: { question: $('#question').val() },
    type: 'POST',
    dataType: 'json'
  };
  $.ajax(options)
  .done((res) => {
    const link = `<a href="/api/v1/polls/${res.data}">here</a>`;
    $('#question').val('');
    $('#create-poll').hide();
    $('#message').html(`Thanks. You can view your poll ${link}.`);
  })
  .fail((err) => {
    $('#message').html('Something bad happened. Try again.');
  });
});
