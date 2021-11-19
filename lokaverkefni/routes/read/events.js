const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../../db/database.db');
const getEvents = require('../../db/getEvents');
const checkPrivilege = require('../../db/read/privilege');

router.get('/', (req, res) => {
  let where = 'WHERE id';
  const events = getEvents(dbFile, where)
  // Check if user is logged in
  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = checkPrivilege(dbFile, username).userPrivilege;
    const header01 = 'Events'
	  const userValue = 'Log out';
    res.render('events', { title: 'Events', header01, userValue, events, userPrivilege})
  } else {
    const username = 'none';
    const userPrivilege = checkPrivilege(dbFile, username);
    const header01 = 'Events'
    const userValue = 'Login';
    res.render('events', { title: 'Events', header01, userValue, events, userPrivilege})
  }
});

module.exports = router;