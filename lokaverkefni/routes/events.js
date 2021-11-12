const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const getEvents = require('../db/getEvents');
const update = require('../db/update');
const loginUser = require('../db/loginFunction');
const deleteEvent = require('../db/delete/deleteEvent');

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
    console.log(username)
    const userValue = 'Log out';
    const events = getEvents(dbFile, where);
    const userPrivilegeFromDB = loginUser(dbFile, username);
    const userPrivilege = userPrivilegeFromDB.userPrivilege;
    res.render('event', { title: `${events.name}`, username, userValue, events, hidden, userPrivilege})
  } else {
    const username = 'none';
    const userValue = 'Login';
    const events = getEvents(dbFile, where);
    const userPrivilege = 'None';
    res.render('event', { title: 'a', username, userValue, events, hidden, userPrivilege})
  }
});

router.get('/:id/edit', (req, res) => {
  const username = req.session.username;
  const userValue = 'Log out';
  const params = req.params.id;
  const where = `WHERE id = ${params};`;
  const events = getEvents(dbFile, where);
  const hidden = 1;
  const userPrivilegeFromDB = loginUser(dbFile, username);
  const userPrivilege = userPrivilegeFromDB.userPrivilege;
  res.render('event', { username, userValue, events, hidden, userPrivilege })
})

router.post('/:id/update', (req, res) => {
  const params = req.params.id;
  const where = `WHERE id = ${params};`;
  const events = getEvents(dbFile, where);
  update(dbFile, params, req.body.newName, req.body.newDescription);
  res.redirect('/');
});

router.post('/:id/delete', (req, res) => {
  const params = req.params.id;
  console.log(params)
  deleteEvent(dbFile, params);
  res.redirect('/')
})

module.exports = router;