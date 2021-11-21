const express = require('express');
const path = require('path');
const testCancel = require('../db/delete/eventCancel');
const router = express.Router();
const readUserPrivilege = require('../db/read/privilege');
const dbFile = path.join(__dirname, '../db/database.db');

router.post('/', (req, res) => {
  const username = req.session.username;
  const user = readUserPrivilege(dbFile, username).id;
  testCancel(dbFile, user, req.body.idEvent);
  res.redirect('/');
});

module.exports = router;