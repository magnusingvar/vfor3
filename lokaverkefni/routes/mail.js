const nodemailer = require('nodemailer');

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
  from: 'magnusingvar2@gmail.com',
  to: 'magnusingvar@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transport.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});