const express = require('express');
const router = express.Router();
const path = require('path');
const loginUser = require('../db/loginFunction');
const bcrypt = require('bcrypt');
const dbFile = path.join(__dirname, '../db/database.db');
const readUser = require('../db/read/readUser');

/* if user is logged in and presses the 'log in / out'
button then log him out. */
router.get('/', (req, res) => {
	if (req.session.loggedIn) {
		console.log('Log out successful!')
		res.redirect('/');
	} else {
		const header = 'Login';
		const username = 'none';
    let userPrivilege = readUser(dbFile, username);
		res.render('login', { title: 'Login', header, username, userPrivilege});
	}
});

// get login page
router.post('/', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const user = loginUser(dbFile, username, password);
	const validPass = bcrypt.compareSync(password, user.password);
	if (validPass) {
		req.session.loggedIn = true;
		req.session.username = user.username;
		console.log('Success');
		res.redirect('/');
	} else {
		console.log('Username or password is incorrect');
		res.redirect('/login');
	}
});

module.exports = router;