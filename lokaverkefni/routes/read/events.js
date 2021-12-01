const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../../db/database.db');
const getEvents = require('../../db/read/readEvents');
const readUser = require('../../db/read/readUser');
const userLoggedIn = require('../../functions/userSession');

router.get('/', (req, res) => {
  const username = userLoggedIn(req.session);
  let where = 'WHERE id';
  const events = getEvents(dbFile, where);
  const header = 'Events';

  // Check if user is logged in
  if (req.session.loggedIn) {
    const userPrivilege = readUser(dbFile, username).userPrivilege;
    res.render('read/events', { title: 'Events', header, events, username, userPrivilege})
  } else {
    const userPrivilege = readUser(dbFile, username);
    res.render('read/events', { title: 'Events', header, events, username, userPrivilege})
  }
});

module.exports = router;