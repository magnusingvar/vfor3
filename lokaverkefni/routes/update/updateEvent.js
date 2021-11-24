const express = require('express');
const router = express.Router();
const path = require('path');
const readEvent = require('../../db/read/readEvent');
const dbFile = path.join(__dirname, '../../db/database.db');
const readUser = require('../../db/read/readUser')
const updateEvent = require('../../db/update/updateEvent');
const multer = require('multer');

router.get('/', (req, res) => {
  try {
    if (req.session.loggedIn) {
      const event = readEvent(dbFile, req.query.idEvent);
      const username = req.session.username;
      const userPrivilege = readUser(dbFile, username).userPrivilege;
      res.render('includes/eventEditor', {title: 'Editor', username, userPrivilege, event})
    } else {
      const username = 'none';
      res.render('error', { title: 'Error', status: 403, msg: `You do not have the permissions to perform this action.`, username });
    }
  } catch (e) {
    const username = 'none';
    res.render('error', { title: 'Error', status: 404, msg: 'Page not found', username });
  }
});

const storage = multer.diskStorage({
   destination: function(req, file, cb) {
     cb(null, 'public/images/uploads');
   },
   filename: function(req, file, cb) {
     cb(null, req.body.idEvent + '.jpg');
   }
 });

const upload = multer({storage: storage})


const m = ['January', 'February', 'March',
'April', 'May', 'June', 'July', 'August',
'September', 'October', 'November', 'December'];


router.post('/', upload.single('file'), (req, res) => {
  if (req.session.loggedIn) {
    const d = new Date(); 
    const date = req.body.day;
    const month = m[req.body.month-1];
    const year = req.body.year;
    const evDate = `${date} ${month} ${year}`
    const image = `${req.body.idEvent}` + '.jpg'
    updateEvent(dbFile, req.body.idEvent, req.body.name, req.body.description, evDate, image); 
    res.redirect('/')
  } else {
    const username = 'none';
    res.render('error', { title: 'Error', status: 403, msg: `You don't have permission to perform this action.`, username });
  }
});

module.exports = router;