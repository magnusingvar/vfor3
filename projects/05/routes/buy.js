const express = require('express');

const router = express.Router();

// náum í index síðuna og birtum hana
router.get('/', (req, res) => {
  res.render('buy', { title: 'Buy' });
});

module.exports = router;