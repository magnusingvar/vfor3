const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../db/read/readUser');
const registerUser = require('../db/registerFunction');
const dbFile = path.join(__dirname, '../db/database.db');
const userLoggedIn = require('../functions/userSession');

// get register page
router.get('/', (req, res) => {
	const header = 'Register';
	const username = userLoggedIn(req.session);
	if (req.session.loggedIn) {
		const userPrivilege = readUser(dbFile, username).userPrivilege;
		res.render('register', { title: 'Register', header, username, userPrivilege});
	} else {
		res.render('register', { title: 'Register', header, username});
	}
});

// post register page
router.post('/', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	registerUser(dbFile, username, password)
	res.redirect('/');
});

module.exports = router;