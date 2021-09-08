const express = require('express');

const router = express.Router();

// náum í index síðuna og birtum hana
router.get('/', (req, res) => {
  const homePage = "Go back to homepage";
  const name = "Name: Magnús";
  const dob = "Date of birth: 18 August 2003";
  const pob = "Birth place: Reykjavík";
  res.render('about', { title: 'About', homePage, name, dob, pob});
});

module.exports = router;