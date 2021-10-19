const express = require('express');
const router = express.Router();

const subjects = ['English', 'Mathematics'];

router.get('/', (req, res) => {
  res.render('subjects', { title: 'Subjects', subjects });
});

module.exports = router;