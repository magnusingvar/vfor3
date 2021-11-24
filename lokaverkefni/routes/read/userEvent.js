const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../../db/database.db');
const getEvents = require('../../db/read/readUserEvent');
const readUser = require('../../db/read/readUser');

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = readUser(dbFile, username).userPrivilege;
    const user = readUser(dbFile, username).id;
    let where = `WHERE idUser = ${user}`;
    const events = getEvents(dbFile, where)
    console.log(events)
    res.render('./read/myEvents', { title: 'My Events', status: 'working', username, events, userPrivilege } )
  } else {
    const username = 'none';
    const userPrivilege = readUser(dbFile, username);
    res.render('./read/myEvents', { title: 'Error', status: 'error', username, userPrivilege})
  } 
});

module.exports = router;