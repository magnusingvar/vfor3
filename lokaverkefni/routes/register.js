const express = require('express');
const router = express.Router();
const path = require('path');
const registerUser = require('../db/registerFunction');
const dbFile = path.join(__dirname, '../db/database.db');

// get register page
router.get('/', (req, res) => {
	res.render('register', { title: 'Register'});
});

// post register page
router.post('/', (req, res) => {
	const username = req.body.user;
	const password = req.body.password;
	registerUser(dbFile, username, password)
	res.redirect('/');
});

module.exports = router;