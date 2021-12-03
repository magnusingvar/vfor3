const express = require('express');
const router = express.Router();
const path = require('path');
const readUser = require('../../db/read/readUser');
const registerUser = require('../../db/registerFunction');
const userLoggedIn = require('./userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

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
	try {
		const username = req.body.username;
		const password = req.body.password;
		registerUser(dbFile, username, password);
		res.redirect('/');	
	} catch (e) {
		res.render('error', { title: 'Error', status: '403', msg: 'User already exists!', username: 'none'});
	}
});

module.exports = router;