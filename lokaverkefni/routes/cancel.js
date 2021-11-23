const express = require('express');
const path = require('path');
const testCancel = require('../db/delete/eventCancel');
const router = express.Router();
const readUser = require('../db/read/readUser');
const dbFile = path.join(__dirname, '../db/database.db');

router.post('/', (req, res) => {
  const username = req.session.username;
  const user = readUser(dbFile, username).id;
  testCancel(dbFile, user, req.body.idEvent);
  res.redirect(`/event?idEvent=${req.body.idEvent}`)
});

module.exports = router;