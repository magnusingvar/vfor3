const express = require('express');
const router = express.Router();
const path = require('path');
const signup = require('../../db/create/eventSignup');

const readEvent = require('../../db/read/readEvent');
const readUserPrivilege = require('../../db/read/privilege');
const dbFile = path.join(__dirname, '../../db/database.db');
const testtest = require('../../db/read/readUserEvent');
// const update = require('../../db/update');

router.get('/', (req, res) => {
  const username = req.session.username;
  const user = readUserPrivilege(dbFile, username).id;
  const test = testtest(dbFile, user, req.body.idEvent)  

  if (test == undefined) {
    const signedUp = "False";
    signup(dbFile, user, req.body.idEvent);
    res.render('read/event', {title: 'test', signedUp});
  } else {
    const signedUp = "True";
    res.render('read/event', {title: 'test', signedUp});
    res.redirect('/');
    console.log('yes');
  }

  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = readUserPrivilege(dbFile, username).userPrivilege;
    const event = readEvent(dbFile, req.query.idEvent);
    const userValue = 'Log out';
    res.render('read/event', { userPrivilege, userValue, event, signedUp } )
  } else {
    const username = '';
    const userPrivilege = readUserPrivilege(dbFile, username);
    const event = readEvent(dbFile, req.query.idEvent);
    const userValue = 'Login';
    res.render('read/event', { userPrivilege, userValue, event, signedUp } )
  }
});

module.exports = router;