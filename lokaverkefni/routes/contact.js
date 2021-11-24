const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const readUser = require('../db/read/readUser');

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    const header = 'Contact'
    const username = req.session.username;
    const userPrivilege = readUser(dbFile, username).userPrivilege;
    res.render('contact', { title: 'Contact us', header, username, userPrivilege});
	} else {
    const header = 'Contact'
    const username = 'none';
    const userPrivilege = readUser(dbFile, username);
    res.render('contact', { title: 'Contact us', header, username, userPrivilege});
  }
});

router.post('/', (req, res) => {
  let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ed0b93b031f80c",
      pass: "7dd9c187311065"
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