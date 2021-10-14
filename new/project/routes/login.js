const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  if(req.session.loggedIn) {
    res.redirect('/')
  } else {
    const header01 = 'Velkomin á login síðuna!';
    const text01 = 'Fara til baka';
    res.render('login', { title: 'Login', header01, text01 });
  }
});

router.post('/', (req, res) => {
  const adminuser = 'User';
  const adminPassword = 'Password';
  const user = req.body.username;
  const password = req.body.password;

  if (adminuser == user && adminPassword == password){
    req.session.loggedIn = true;
    req.session.username = user;
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
});

module.exports = router;