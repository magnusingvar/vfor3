const express = require('express');
const path = require('path');
const signup = require('../db/create/eventSignup');
const router = express.Router();
const readUser = require('../db/read/readUser');
const testtest = require('../db/read/readUserEvent');
const dbFile = path.join(__dirname, '../db/database.db');

router.post('/', (req, res) => {
  const username = req.session.username;
  const user = readUser(dbFile, username).id;
  // const test = testtest(dbFile, user, req.body.idEvent)  

  // if (test == undefined) {
  //   const signedUp = False;
  //   signup(dbFile, user, req.body.idEvent);
  //   res.redirect('/');
  // } else {
  //   const signedUp = True;
  //   res.redirect('/');
  //   console.log('yes');
  // }

  // const bruh = user;
  // console.log(bruh)
  signup(dbFile, user, req.body.idEvent);
  res.redirect(`/event?idEvent=${req.body.idEvent}`)
});

module.exports = router;