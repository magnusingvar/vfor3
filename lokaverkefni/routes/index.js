const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.username;
    const header01 = `${username} is logged in`;
    const userValue = 'Log out';
    res.render('index', { title: 'Forsíða', header01, userValue});
  } else {
    const header01 = 'Velkomin!';
    const userValue = 'Log in';
    res.render('index', { title: 'Forsíða', header01, userValue });
  }
});

module.exports = router;