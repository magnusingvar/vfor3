const express = require('express');
const path = require('path');
const deleteEvent = require('../../db/delete/deleteEvent');
const router = express.Router();
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
    if (req.session.loggedIn) {
      deleteEvent(dbFile, req.body.idEvent);
      res.redirect('/');
    } else {
      const username = 'none';
      res.render('error', { title: 'Error', status: 403, msg: `You don't have permission to perform this action.`, username });
    }
});

module.exports = router;