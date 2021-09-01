const express = require('express');

const router = express.Router();

// náum í index síðuna og birtum hana
router.get('/', (req, res) => {
  const story = 'Once upon a time in the west.............';
  res.render('index', { title: 'Upphafssíðan á þessu bulli', story });
});

module.exports = router;