const express = require('express');
const path = require('path');
const deleteEvent = require('../../db/delete/deleteEvent');
const router = express.Router();
const dbFile = path.join(__dirname, '../../db/database.db');

router.post('/', (req, res) => {
  deleteEvent(dbFile, req.body.idEvent);
  res.redirect('/');
});

module.exports = router;