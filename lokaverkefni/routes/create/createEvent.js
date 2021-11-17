const express = require('express');
const path = require('path');
const createEvent = require('../../db/create/createEvent');
const router = express.Router();
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
  res.render('create/event', { title: 'Create event'} );
});

router.post('/', (req, res) => {
  createEvent(dbFile, req.body.name, req.body.description);
  res.redirect('/')
})

module.exports = router;