const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  const renderObject = {};
  renderObject.title = 'Welcome to Express!';
  res.render('index', renderObject);
});

module.exports = router;
