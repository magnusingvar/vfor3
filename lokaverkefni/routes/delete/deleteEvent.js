const express = require('express');
const fs = require('fs');
const path = require('path');
const readEvent = require('../../db/read/readEvent')
const deleteEvent = require('../../db/delete/deleteEvent');
const router = express.Router();
const userLoggedIn = require('../../functions/userSession');
const dbFile = path.join(__dirname, '../../db/database.db');

/* Allow to delete event if logged in and "administrator",
Delete the uploaded image alongside with the event if possible. */
router.post('/', (req, res) => {
  const username = userLoggedIn(req.session);
  if (req.session.loggedIn) {
    const event = readEvent(dbFile, req.body.id).image;
    console.log(event)
      const imgPath = 'public/images/uploads/' + `${event}`;
      if (imgPath == 'public/images/uploads/blank.png') {
        deleteEvent(dbFile, req.body.id);
      } else {
        fs.unlink(imgPath, function (err) {
          if (err) {
            console.log('This event has no image attached to it.')
            deleteEvent(dbFile, req.body.id);
            res.redirect('/');
          } else {
            deleteEvent(dbFile, req.body.id);
            res.redirect('/');
            // if no error, file has been deleted successfully
            console.log('File deleted!');
          }
        })
      }
    } else {
    res.render('error', { title: 'Error', status: 403, msg: `Access denied.`, username });
  }
});

module.exports = router;