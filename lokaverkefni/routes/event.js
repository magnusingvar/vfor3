const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const update = require('../db/update');

router.get('/', (req, res) => {
  console.log('test')
});

router.post('/', (req, res) => {
  update(dbFile, req.params.id, req.body.newName, req.body.newDescription);
});

module.exports = router;