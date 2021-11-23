const express = require('express');
const router = express.Router();
const path = require('path');
const signup = require('../../db/create/eventSignup');
const readEvent = require('../../db/read/readEvent');
const readUserEvent = require('../../db/read/readUserEvent');
const readUser = require('../../db/read/readUser');
const dbFile = path.join(__dirname, '../../db/database.db');
// const update = require('../../db/update');

router.get('/', (req, res) => {
  try {
    const username = req.session.username;
    const event = readEvent(dbFile, req.query.idEvent);
    const userEvent = [];
    let where = `WHERE idEvent = ${req.query.idEvent}`;
    if (req.session.loggedIn) {
      const userEvent = readUserEvent(dbFile, where);
      const userPrivilege = readUser(dbFile, username).userPrivilege;
      res.render('read/event', { title: event.name, username, userPrivilege, userValue: 'Log out', event, userEvent } )
    } else {
      const username = 'none';
      const userPrivilege = readUser(dbFile, username);
      res.render('read/event', { title: event.name, username, userPrivilege, userValue: 'Login', event, userEvent } )
    }
  } catch (e) {
    res.status(404);
    res.render('error', { title: 'Error', status: 404, msg: 'Page not found!' });
  }
});

module.exports = router;