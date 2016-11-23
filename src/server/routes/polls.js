const express = require('express');
const router = express.Router();

const queries = require('../db/queries');

router.get('/:id', (req, res, next) => {
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
      yes: votes.yes,
      no: votes.no
    };
    return res.status(200).json({
      status: 'success',
      message: 'Poll found',
      data: data
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  });
});

router.post('/', (req, res, next) => {
  if (!req.body.question) {
    return res.status(400).json({
      status: 'error',
      message: 'A question is required'
    });
  }
  return queries.addPoll(req.body)
  .then((poll) => { return queries.addVote(parseInt(poll[0].id)); })
  .then((votes) => {
    if (!votes) { throw new Error('Something went wrong'); }
    return res.status(200).json({
      status: 'success',
      message: 'Poll created',
      data: votes[0].poll_id
    });
  })
  .catch((err) => {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  });
});

router.put('/:id/vote', (req, res, next) => {
  res.json('test');
});

module.exports = router;
