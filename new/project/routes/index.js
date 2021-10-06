const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const header01 = 'Velkomin!';
  const text01 = 'Viltu skrá þig inn?';
  res.render('index', { title: 'Forsíða', header01, text01 });
});

module.exports = router;