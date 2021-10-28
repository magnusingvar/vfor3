const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.username;
    const header01 = `${username} is logged in`;
    const test = 'Log out';
    res.render('index', { title: 'Forsíða', header01, test});
  } else {
    const header01 = 'Velkomin!';
    const test = 'Log in';
    res.render('index', { title: 'Forsíða', header01, test });
  }
});

module.exports = router;