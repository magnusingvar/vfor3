const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.username;
    const header01 = `${username} is logged in`;
    const text01 = 'Test';
    res.render('index', { title: 'Forsíða', header01, text01});
  } else {
    const header01 = 'Velkomin!';
    const text01 = 'Viltu skrá þig inn?';
    res.render('index', { title: 'Forsíða', header01, text01 });
  }
});

module.exports = router;