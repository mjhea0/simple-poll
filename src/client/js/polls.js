const socket = io().connect();

$(function() {

  $('#message').html('');
  const cookie = getCookies();
  if (cookie)  {
    $('button').prop('disabled', true);
    $('#message').html('You\'ve already voted. Thanks!');
  }

  socket.on('voted', (data) => {
    $('#yay-button').html(`&nbsp;${data.yay}`);
    $('#nay-button').html(`&nbsp;${data.nay}`);
  });

});

function getCookies() {
  if (Cookies.get('straw')) {
    const pollID = parseInt($('#question').attr('data-id'));
    const cookieArray = Cookies.get('straw').split(',');
    for (let id of cookieArray) {
      if (parseInt(id) === pollID) return true;
    }
  }
  return false;
}

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
  // update server
  $.ajax(options)
  .done((res) => {
    // handle success
    if (type === 'yay') self.html(`&nbsp;${res.data.votes.yay}`);
    else if (type === 'nay') self.html(`&nbsp;${res.data.votes.nay}`);
    $('#message').html('Thanks for voting.');
  })
  .fail((err) => {
    // handle error
    $('button').prop('disabled', false);
    $('#message').html('Something bad happened. Try again.');
  });
});
