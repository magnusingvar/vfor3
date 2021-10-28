const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const test = 'test';
  // if (req.session.loggedIn) {
  //   const username = req.session.username;
  //   const test = 'Test'
  //   res.render('index', { title2: 'Login', test});
  // } else {
  //   const test = 'Test2';
  //   res.render('index', { title2: 'Log out', test});
  // }
});

module.exports = router;