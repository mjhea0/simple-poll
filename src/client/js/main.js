(function () { console.log('sanity check!'); })();

$('#create-poll').on('submit', (event) => {
  event.preventDefault();
  const options = {
    url: '/api/v1/polls',
    data: { question: $('#question').val() },
    type: 'POST',
    dataType: 'json'
  };
  $.ajax(options)
  .done((data) => {
    console.log(data);
  })
  .fail((err) => {
    console.log(err);
  });
});
