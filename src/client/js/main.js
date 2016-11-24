// create new poll
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
    const link = `<a href="/polls/${res.data}">here</a>`;
    $('#question').val('');
    $('#create-poll').hide();
    $('#message').html(`Thanks. You can view your poll ${link}.`);
  })
  .fail((err) => {
    $('#message').html('Something bad happened. Try again.');
  });
});

// handle up/down vote
$('body').on('click', 'button', function() {
  const self = $(this);
  const pollID = $(this).attr('data-id');
  const type = self.attr('data-type');
  $('button').prop('disabled', true);
  $('#message').html('');
  const options = {
    url: `/api/v1/polls/${pollID}/vote`,
    data: { type:  type },
    type: 'PUT',
    dataType: 'json'
  };
  $.ajax(options)
  .done((res) => {
    if (type === 'yay') self.html(`&nbsp;${res.data.votes.yay}`);
    else if (type === 'nay') self.html(`&nbsp;${res.data.votes.nay}`);
  })
  .fail((err) => {
    $('button').prop('disabled', false);
    $('#message').html('Something bad happened. Try again.');
  });
});
