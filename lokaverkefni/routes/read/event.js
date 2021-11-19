const express = require('express');
const router = express.Router();
const path = require('path');
const readEvent = require('../../db/read/readEvent');
const readUserPrivilege = require('../../db/read/privilege');
const dbFile = path.join(__dirname, '../../db/database.db');
// const update = require('../../db/update');

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = readUserPrivilege(dbFile, username).userPrivilege;
    const event = readEvent(dbFile, req.query.idEvent);
    const userValue = 'Log out';
    res.render('read/event', { userPrivilege, userValue, event } )
  } else {
    const username = '';
    const userPrivilege = readUserPrivilege(dbFile, username);
    const event = readEvent(dbFile, req.query.idEvent);
    const userValue = 'Login';
    res.render('read/event', { userPrivilege, userValue, event } )
  }
});

module.exports = router;