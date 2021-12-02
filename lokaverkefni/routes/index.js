const express = require('express');
const router = express.Router();
const path = require('path');
const getEvents = require('../db/read/readEvents');
const readUser = require('../db/read/readUser');
const userLoggedIn = require('./functions/userSession');
const dbFile = path.join(__dirname, '../db/database.db');

router.get('/', (req, res) => {
  const username = userLoggedIn(req.session);
  let where = 'WHERE id ORDER BY id DESC LIMIT 4';
  const events = getEvents(dbFile, where)
  const header = 'New events';
  if (req.session.loggedIn) {
    const userPrivilege = readUser(dbFile, username).userPrivilege;
    res.render('index', { title: 'Homepage', header, events, username, userPrivilege});
  } else {
    const userPrivilege = readUser(dbFile, username);
    res.render('index', { title: 'Homepage', header, events, username, userPrivilege});
  }
});

module.exports = router;