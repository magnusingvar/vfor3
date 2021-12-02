const express = require('express');
const router = express.Router();
const path = require('path');
const loginUser = require('../../db/loginFunction');
const readUser = require('../../db/read/readUser');
const userLoggedIn = require('./userSession');
const bcrypt = require('bcrypt');
const dbFile = path.join(__dirname, '../../db/database.db');

// Get login page
router.get('/', (req, res) => {
	const header = 'Login';
  const username = userLoggedIn(req.session);
	if (req.session.loggedIn) {
		const userPrivilege = readUser(dbFile, username).userPrivilege;
		res.render('login', { title: 'Login', header, username, userPrivilege});
	} else {
		const userPrivilege = readUser(dbFile, username);
		res.render('login', { title: 'Login', header, username, userPrivilege});
	}
});

// post login page
router.post('/', (req, res) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		const user = loginUser(dbFile, username, password);
		const validPass = bcrypt.compareSync(password, user.password);
		if (validPass) {
			req.session.loggedIn = true;
			req.session.username = username;
			res.redirect('/');
		} else {
			console.log('Username or password is incorrect');
			res.redirect('/login');
		}
	} catch (e) {
		res.render('error', { title: 'Error', status: '404', msg: 'User not found!', username: 'none'});
	}
});

module.exports = router;