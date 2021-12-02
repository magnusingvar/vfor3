const express = require('express');
const router = express.Router();
const path = require('path');
const getEvents = require('../../db/read/readUserEvent');
const readUser = require('../../db/read/readUser');
const userLoggedIn = require('../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
  const username = userLoggedIn(req.session);
  const header = 'My events';

  if (req.session.loggedIn) {
    const userPrivilege = readUser(dbFile, username).userPrivilege;
    const user = readUser(dbFile, username).id;
    let where = `WHERE idUser = ${user}`;
    const events = getEvents(dbFile, where);
    res.render('./read/myEvents', { title: 'My Events', header, username, events, userPrivilege } );
  } else {
    const userPrivilege = readUser(dbFile, username);
    const events = [];
    res.render('./read/myEvents', { title: 'My Events', header, username, userPrivilege, events});
  } 
});

module.exports = router;