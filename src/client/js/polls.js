const socket = io().connect();

$(function() {

  $('#message').html('');
  const local = checkLocalStorage();
  if (local)  {
    $('button').prop('disabled', true);
    $('#message').html('You\'ve already voted. Thanks!');
  }

  socket.on('voted', (data) => {
    $('#yay-button').html(`&nbsp;${data.yay}`);
    $('#nay-button').html(`&nbsp;${data.nay}`);
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
  // update server
  $.ajax(options)
  .done((res) => {
    // handle success
    if (type === 'yay') self.html(`&nbsp;${res.data.votes.yay}`);
    else if (type === 'nay') self.html(`&nbsp;${res.data.votes.nay}`);
    $('#message').html('Thanks for voting.');
    updateLocalStorage(pollID);
  })
  .fail((err) => {
    // handle error
    $('button').prop('disabled', false);
    $('#message').html('Something bad happened. Try again.');
  });
});

function checkLocalStorage() {
  const data = localStorage.getItem('chant');
  if (data) {
    const pollID = parseInt($('#question').attr('data-id'));
    const dataArray = data.split(',');
    for (let id of data) {
      if (parseInt(id) === pollID) return true;
    }
    return false;
  }
  return false;
}

function updateLocalStorage(pollID) {
  const data = localStorage.getItem('chant');
  if (data) {
    const dataArray = data.split(',');
    for (let id of data) {
      if (parseInt(id) === pollID) return;
    }
    dataArray.push(pollID.toString());
    localStorage.setItem('chant', dataArray);
  } else {
    localStorage.setItem('chant', pollID);
  }
}
