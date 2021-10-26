const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.username;
    const header01 = `${username} is logged in`;
    res.render('index', { title: 'Forsíða', header01 });
  } else {
    const header01 = 'Velkomin!';
    res.render('index', { title: 'Forsíða', header01 });
  }
});

module.exports = router;