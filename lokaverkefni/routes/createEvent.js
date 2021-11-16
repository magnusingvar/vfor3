const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const checkPrivilege = require('../db/read/privilege');

router.get('/', (req, res) => {
  res.send('test');
});

module.exports = router;