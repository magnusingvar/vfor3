const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const test = 'Login';
  res.render('events', { title: 'Events', test });
});

module.exports = router;