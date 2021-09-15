const express = require('express');

const router = express.Router();

// náum í index síðuna og birtum hana
router.get('/', (req, res) => {
  res.render('index', { title: 'Index' });
});

module.exports = router;