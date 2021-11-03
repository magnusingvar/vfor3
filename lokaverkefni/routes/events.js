const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const getEvents = require('../db/getEvents');

router.get('/', (req, res) => {
  // Push data from events table into
  // an array
  const item = getEvents(dbFile);
  const events = []
  item.forEach((row) => {
    events.push(row);
  });
  
  // Check if user is logged in
  if (req.session.loggedIn) {
    const header01 = 'Events'
	  const userValue = 'Log out';
    res.render('events', { title: 'Events', header01, userValue, events})
  } else {
    const header01 = 'Events'
    const userValue = 'Login';
    res.render('events', { title: 'Events', header01, userValue, events})
  }
});

module.exports = router;