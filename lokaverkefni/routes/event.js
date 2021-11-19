const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const update = require('../db/update');

router.get('/', (req, res) => {
  res.render('read/event', {title: 'test'});
});

router.post('/', (req, res) => {
  update(dbFile, req.params.id, req.body.newName, req.body.newDescription);
});

module.exports = router;