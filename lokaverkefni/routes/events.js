const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const getEvents = require('../db/getEvents');
const Database = require('better-sqlite3');

router.get('/', (req, res) => {
  // Push data from events table into
  // an array
  const item = getEvents.getAllInfo(dbFile);
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

router.get('/:id', (req, res) => {
  // Push data from events table into
  // an array
  const item = getEvents.getAllInfo(dbFile);
  const events = []
  item.forEach((row) => {
    events.push(row);
  });

  if (req.session.loggedIn) {
    const userValue = 'Log out';
    const params = req.params.id; 
    const id = getEvents.getId(dbFile, params);
    res.render('event', { title: 'Test', userValue, id, events})
  } else {
    const userValue = 'Login';
    const params = req.params.id; 
    const id = getEvents.getId(dbFile, params);
    res.render('event', { title: 'Test', userValue, id, events})
  }
});


module.exports = router;