const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const getEvents = require('../db/read/readEvents');
const checkPrivilege = require('../db/read/privilege');

router.get('/', (req, res) => {
  const events = getEvents(dbFile)

  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = checkPrivilege(dbFile, username).userPrivilege;
    const header01 = 'New events';
    const userValue = 'Log out';
    res.render('index', { title: 'Forsíða', header01, userValue, events, userPrivilege});
  } else {
    const username = 'none';
    const userPrivilege = checkPrivilege(dbFile, username);
    const header01 = 'New events';
    const userValue = 'Login';
    res.render('index', { title: 'Forsíða', header01, userValue, events, userPrivilege});
  }
});

module.exports = router;