const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const header01 = 'Velkomin á login síðuna!';
  const text01 = 'Fara til baka';
  res.render('login', { title: 'Login', header01, text01 });
});

router.get('/', (req, res) => {
  const adminuser = 'User';
  const adminPassword = 'Password';
  const user = req.body.username;
  const password = req.body.password;

  if (adminuser == user && adminPassword == password){
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;