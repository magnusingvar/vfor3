const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
		const userValue = 'Log out';
    res.render('contact', { title: 'Contact us', userValue });
	} else {
    const userValue = 'Log in';
    res.render('contact', { title: 'Contact us', userValue });
  }
});

router.post('/', (req, res) => {
  res.render('contact', { title: 'Contact us', userValue });
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
    from: 'magnusnodemailer@gmail.com',
    to: req.body.email,
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