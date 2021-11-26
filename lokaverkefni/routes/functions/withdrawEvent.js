const express = require('express');
const path = require('path');
const router = express.Router();
const readUser = require('../../db/read/readUser');
const withdraw = require('../../db/delete/eventCancel');
const dbFile = path.join(__dirname, '../../db/database.db');
const userLoggedIn = require('../../functions/userSession');

router.post('/', (req, res) => {
  const username = userLoggedIn(req.session);
  const user = readUser(dbFile, username).id;
  withdraw(dbFile, user, req.body.idEvent);
  res.redirect(`/event?idEvent=${req.body.idEvent}`)
});

module.exports = router;