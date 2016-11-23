const express = require('express');
const router = express.Router();

const queries = require('../db/queries');

router.get('/:id', (req, res, next) => {
  res.json('test');
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
