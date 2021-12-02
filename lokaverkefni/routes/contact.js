const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const readUser = require('../db/read/readUser');
const userLoggedIn = require('./functions/userSession');
const dbFile = path.join(__dirname, '../db/database.db');
require('dotenv').config();

router.get('/', (req, res) => {
  const username = userLoggedIn(req.session);
  if (req.session.loggedIn) {
    const header = 'Contact'
    const userPrivilege = readUser(dbFile, username).userPrivilege;
    res.render('contact', { title: 'Contact us', header, username, userPrivilege});
	} else {
    const header = 'Contact'
    const userPrivilege = readUser(dbFile, username);
    res.render('contact', { title: 'Contact us', header, username, userPrivilege});
  }
});

router.post('/', (req, res) => {
  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 25,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: {
      name: req.body.name,
      address: req.body.email
    },
    to: 'vfor3jq05@gmail.com',
      subject: req.body.subject,
      text: req.body.message
  };

  transport.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

  res.redirect('/')
});

module.exports = router;    