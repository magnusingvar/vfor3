const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const getEvents = require('../db/read/readEvents');
const readUser = require('../db/read/readUser');

router.get('/', (req, res) => {
  const events = getEvents(dbFile)
  const header = 'New events';

  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = readUser(dbFile, username).userPrivilege;
    res.render('index', { title: 'Forsíða', header, events, username, userPrivilege});
  } else {
    const username = 'none';
    const userPrivilege = readUser(dbFile, username);
    res.render('index', { title: 'Forsíða', header, events, username, userPrivilege});
  }
});

module.exports = router;