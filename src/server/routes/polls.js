const express = require('express');
const router = express.Router();

router.get('/:url', (req, res, next) => {
  res.json('test');
});

router.post('/', (req, res, next) => {
  res.json('test');
});

router.put('/:url/vote', (req, res, next) => {
  res.json('test');
});

module.exports = router;
