const express = require('express');
const path = require('path');
const signup = require('../db/create/eventSignup');
const router = express.Router();
const readUserPrivilege = require('../db/read/privilege');
const testtest = require('../db/read/readUserEvent');
const dbFile = path.join(__dirname, '../db/database.db');

router.post('/', (req, res) => {
  const username = req.session.username;
  const user = readUserPrivilege(dbFile, username).id;
  const test = testtest(dbFile, user, req.body.idEvent)  

  if (test == undefined) {
    const signedUp = False;
    signup(dbFile, user, req.body.idEvent);
    res.redirect('/');
  } else {
    const signedUp = True;
    res.redirect('/');
    console.log('yes');
  }

  // const bruh = user;
  // console.log(bruh)
  // const test = signup(dbFile, user, req.body.idEvent);
  // console.log(test);
  // res.redirect('/');
});

module.exports = router;