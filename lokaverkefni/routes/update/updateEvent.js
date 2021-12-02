const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const readEvent = require('../../db/read/readEvent');
const readUser = require('../../db/read/readUser')
const updateEvent = require('../../db/update/updateEvent');
const userLoggedIn = require('../functions/userSession');
const multer = require('multer');
const dbFile = path.join(__dirname, '../../db/database.db');

const d = new Date(); 
const y = d.getFullYear();

const m = ['January', 'February', 'March',
'April', 'May', 'June', 'July', 'August',
'September', 'October', 'November', 'December'];

router.get('/', (req, res) => {
  const username = userLoggedIn(req.session);
  /* Try to fetch page using the query parameter.
  If it fails send error page */
  try {
    if (req.session.loggedIn) {
      const event = readEvent(dbFile, req.query.id);
      // Get event date from database for select on page
      const eventDay = event.day;
      const eventMonth = event.month;
      const eventYear = event.year;
      const userPrivilege = readUser(dbFile, username).userPrivilege;
      res.render('eventMakerEditor/eventMakerEditor', {title: 'Update - ' + event.name, operation: 'update', eventDay, eventMonth, eventYear, m, y, username, userPrivilege, event})
    } else {
      res.render('error', { title: 'Error', status: 403, msg: 'Access denied.', username });
    }
  } catch (e) {
    res.render('error', { title: 'Error', status: 404, msg: 'Page not found!', username });
  }
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/uploads');
  },

  filename: function(req, file, cb) {
    const filename = req.body.name + req.body.day + req.body.month + req.body.year + Date.now() + '.jpg';
    cb(null, filename);
  }
 });

 const upload = multer({
  storage: storage
});

/* Check if user is logged in and if so 
allow him to update, if file is not empty
upload image and when updating if checkbox is 
checked then delete image */
router.post('/', upload.single('file'), (req, res) => {
  const username = userLoggedIn(req.session);
  let checkedValue = req.body['box1']; // This will have one of two values, 'undefined' if it wasn't checked, or 'on' if it is checked
  try {
    if (req.session.loggedIn) {
      const event = readEvent(dbFile, req.body.id);
      const file = req.file;
      if (file) {
        const image = req.file.filename;
        updateEvent(dbFile, req.body.id, req.body.name, req.body.description, req.body.day, req.body.month, req.body.year, image);
        res.redirect('/');
      } else {
        const image = event.image;
        updateEvent(dbFile, req.body.id, req.body.name, req.body.description, req.body.day, req.body.month, req.body.year, image);
        res.redirect('/');
      }
      
      if (checkedValue) {
        const imgPath = 'public/images/uploads/' + event.image;
        fs.unlink(imgPath, function (err) {
          const image = null;
          updateEvent(dbFile, req.body.id, req.body.name, req.body.description, req.body.day, req.body.month, req.body.year, image);
        });
      }
    } else {
      res.render('error', { title: 'Error', status: 403, msg: 'Access denied.', username });
    }
  } catch(e) {
    res.render('error', { title: 'Error', status: 404, msg: 'Page not found!', username });
  }
});

module.exports = router;