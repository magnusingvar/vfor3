const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const getEvents = require('../db/getEvents');
const update = require('../db/update');

router.get('/', (req, res) => {
  let where = 'WHERE id';
  const events = getEvents(dbFile, where)

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
  const params = req.params.id;
  const where = `WHERE id = ${params};`;
  const hidden = 0;

  if (req.session.loggedIn) {
    const username = req.session.username;
    const userValue = 'Log out';
    const events = getEvents(dbFile, where);
    console.log(events.name)
    res.render('event', { title: `${events.name}`, username, userValue, events, hidden})
  } else {
    const username = 'none';
    const userValue = 'Login';
    const events = getEvents(dbFile, where);
    res.render('event', { title: 'a', username, userValue, events, hidden})
  }
});

router.get('/:id/edit', (req, res) => {
  const username = req.session.username;
  const userValue = 'Log out';
  const params = req.params.id;
  const where = `WHERE id = ${params};`;
  const events = getEvents(dbFile, where);
  const hidden = 1;
  res.render('event', { title: 'Test', username, userValue, events, hidden })
})

router.post('/:id/update', (req, res) => {
  const params = req.params.id;
  const where = `WHERE id = ${params};`;
  const events = getEvents(dbFile, where);
  update(dbFile, params, req.body.newName, req.body.newDescription);
  res.redirect('/');
});




module.exports = router;