const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const readUser = require('../db/read/readUser');

router.get('/', (req, res) => {
  res.render('create/event', { title: 'Create' });
});

module.exports = router;