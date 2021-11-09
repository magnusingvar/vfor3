const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const getEvents = require('../db/getEvents');

router.get('/', (req, res) => {
  let where = 'WHERE id';
  const events = getEvents(dbFile, where)

  if (req.session.loggedIn) {
    const username = req.session.username;
    const header01 = 'New events';
    const userValue = 'Log out';
    res.render('index', { title: 'Forsíða', header01, userValue, events});
  } else {
    const header01 = 'New events';
    const userValue = 'Login';
    res.render('index', { title: 'Forsíða', header01, userValue, events});
  }
});

module.exports = router;