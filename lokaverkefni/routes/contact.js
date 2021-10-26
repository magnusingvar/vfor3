const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/', (req, res) => {
  res.render('contact', { title: 'Contact us' });
});

router.post('/', (req, res) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'magnusnodemailer@gmail.com',
      pass: 'MyP455word'
    }
  });
  
  const mailOptions = {
    from: req.body.email,
    to: 'magnusnodemailer@gmail.com',
    subject: 'Sending Email using Node.js',
    text: req.body.message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
})

module.exports = router;