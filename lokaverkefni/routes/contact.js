const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const checkPrivilege = require('../db/read/privilege');

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = checkPrivilege(dbFile, username).userPrivilege;
		const userValue = 'Log out';
    res.render('contact', { title: 'Contact us', userValue, userPrivilege});
	} else {
    const username = 'none';
    const userPrivilege = checkPrivilege(dbFile, username);
    const userValue = 'Login';
    res.render('contact', { title: 'Contact us', userValue, userPrivilege});
  }
});

router.post('/', (req, res) => {
  if (req.session.loggedIn) {
		const userValue = 'Log out';
    res.render('contact', { title: 'Contact us', userValue });
	} else {
    const userValue = 'Login';
    res.render('contact', { title: 'Contact us', userValue });
  }
  let transport = nodemailer.createTransport({
    // host: 'smtp.mailtrap.io',
    host: 'smtp.gmail.com',
    // port: 2525,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    // from: 'vfor3jq05@gmail.com',
    from: req.body.email,
    to: 'magnusnodemailer@gmail.com',
    subject: 'Sending Email using Node.js',
    text: req.body.message
  };

  transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});

module.exports = router;