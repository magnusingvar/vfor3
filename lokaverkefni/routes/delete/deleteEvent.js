const express = require('express');
const path = require('path');
const deleteEvent = require('../../db/delete/deleteEvent');
const router = express.Router();
const dbFile = path.join(__dirname, '../../db/database.db');
const userLoggedIn = require('../../functions/userSession');

router.post('/', (req, res) => {
  const username = userLoggedIn(req.session);
  if (req.session.loggedIn) {
    deleteEvent(dbFile, req.body.idEvent);
    res.redirect('/');
  } else {
    res.render('error', { title: 'Error', status: 403, msg: `You don't have permission to perform this action.`, username });
  }
});

module.exports = router;