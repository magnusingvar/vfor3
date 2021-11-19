const express = require('express');
const path = require('path');
const deleteEvent = require('../../db/delete/deleteEvent');
const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/');
});

router.post('/', (req, res) => {
  deleteEvent(dbFile, req.body.idEvent);
});

module.exports = router;