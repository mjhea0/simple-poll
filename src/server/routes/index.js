const express = require('express');
const router = express.Router();

const queries = require('../db/queries');

router.get('/', (req, res, next) => {
  res.render('index', {});
});

router.get('/polls/:id', (req, res, next) => {
  const pollID = parseInt(req.params.id);
  if (isNaN(pollID)) {
    return res.status(400).json({
      status: 'error',
      message: 'An ID is required'
    });
  }
  const data = {};
  return queries.getSinglePoll(pollID)
  .then((poll) => {
    if (!poll) { throw new Error('Something went wrong'); }
    data.poll = poll.id;
    data.question = poll.question;
    return queries.getVotes(parseInt(poll.id));
  })
  .then((votes) => {
    if (!votes) { throw new Error('Something went wrong'); }
    data.votes = {
      yay: votes.yay,
      nay: votes.nay
    };
    return res.render('polls', data);
  })
  .catch((err) => {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  });
});

module.exports = router;
