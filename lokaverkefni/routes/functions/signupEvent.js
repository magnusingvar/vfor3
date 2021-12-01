const express = require('express');
const path = require('path');
const signup = require('../../db/create/eventSignup');
const router = express.Router();
const readUser = require('../../db/read/readUser');
const dbFile = path.join(__dirname, '../../db/database.db');
const userLoggedIn = require('../../functions/userSession');

router.post('/', (req, res) => {
  const username = userLoggedIn(req.session);
  const user = readUser(dbFile, username).id;
  signup(dbFile, user, req.body.id);
  res.redirect(`/event?id=${req.body.id}`)
});

module.exports = router;