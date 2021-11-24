const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../../db/database.db');
const getEvents = require('../../db/getEvents');
const readUser = require('../../db/read/readUser');

router.get('/', (req, res) => {
  let where = 'WHERE id';
  const events = getEvents(dbFile, where)
  // Check if user is logged in
  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = readUser(dbFile, username).userPrivilege;
    const header01 = 'Events'
    res.render('events', { title: 'Events', header01, events, username, userPrivilege})
  } else {
    const username = 'none';
    const userPrivilege = readUser(dbFile, username);
    const header01 = 'Events'
    res.render('events', { title: 'Events', header01, events, username, userPrivilege})
  }
});

module.exports = router;