const express = require('express');
const path = require('path');
const router = express.Router();
const readUser = require('../../db/read/readUser');
const createEvent = require('../../db/create/createEvent');
const userLoggedIn = require('../../functions/userSession');
const multer = require('multer');
const dbFile = path.join(__dirname, '../../db/database.db');

const d = new Date(); 
const y = d.getFullYear();

// Array for the months of the year to use in select dropdown
const m = ['January', 'February', 'March',
'April', 'May', 'June', 'July', 'August',
'September', 'October', 'November', 'December'];

router.get('/', (req, res) => {
  const username = userLoggedIn(req.session);
  if (req.session.loggedIn) {
    const userPrivilege = readUser(dbFile, username).userPrivilege;
    res.render('createUpdate/eventEditor', { title: 'Create event', operation: 'create', m, y, userPrivilege, username} );
  } else {
    const userPrivilege = readUser(dbFile, username);
    res.render('error', { title: 'Error', status: 403, msg: 'Access denied.', username });
  }
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images/uploads');
  },

  filename: function(req, file, cb) {
    cb(null, req.body.name + req.body.day + req.body.month + req.body.year + '.jpg');
  }
 });

const upload = multer({
  storage: storage
});

router.post('/', upload.single('file'), (req, res) => {
  const username = userLoggedIn(req.session);
  const file = req.file;
  try {
    if (req.session.loggedIn) {
      if (file) {
        const image = `${req.body.name}${req.body.day}${req.body.month}${req.body.year}` + '.jpg';
        createEvent(dbFile, req.body.name, req.body.description, image, req.body.day, req.body.month, req.body.year);
        res.redirect('/');
      } else {
        const image = null;
        createEvent(dbFile, req.body.name, req.body.description, image, req.body.day, req.body.month, req.body.year);
        res.redirect('/');
      }
     } else {
       res.render('error', { title: 'Error', status: 403, msg: 'Access denied.', username });
     }
  } catch (e) {
    res.render('error', { title: 'Error', status: 409, msg: 'An event by this name already exists.', username });
  }
})

module.exports = router;