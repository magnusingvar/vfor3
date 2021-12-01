const express = require('express');
const router = express.Router();
const path = require('path');
const signup = require('../../db/create/eventSignup');
const readEvent = require('../../db/read/readEvent');
const readUserEvent = require('../../db/read/readUserEvent');
const readUser = require('../../db/read/readUser');
const userLoggedIn = require('../../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
  const username = userLoggedIn(req.session);
  try {
    const event = readEvent(dbFile, req.query.id);
    const userEvent = [];
    let where = `WHERE idEvent = ${req.query.id}`;
    if (req.session.loggedIn) {
      const userEvent = readUserEvent(dbFile, where);
      const userPrivilege = readUser(dbFile, username).userPrivilege;
      res.render('read/event', { title: event.name, username, userPrivilege, event, userEvent } )
    } else {
      const userPrivilege = readUser(dbFile, username);
      res.render('read/event', { title: event.name, username, userPrivilege, event, userEvent } )
    }
  } catch (e) {
    res.render('error', { title: 'Error', status: 404, msg: 'Page not found!', username});
  }
});

module.exports = router;