const express = require('express');

const router = express.Router();

// náum í index síðuna og birtum hana
router.get('/', (req, res) => {
  const dogButton = "Read about dogs";
  const aboutButton = "About me";
  res.render('index', { title: 'Index', dogButton, aboutButton });
});

module.exports = router;