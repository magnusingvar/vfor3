const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.username;
    const test = 'Log out';
    res.render('index', { title: 'Forsíða', test});
  } else {
    const test = 'Log in';
    res.render('index', { title: 'Forsíða' , test});
  }
});

module.exports = router;