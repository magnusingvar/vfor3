const express = require('express');
const router = express.Router();
const path = require('path');
const readEvent = require('../../db/read/readEvent');
const dbFile = path.join(__dirname, '../../db/database.db');
const readUser = require('../../db/read/readUser')
const updateEvent = require('../../db/update/updateEvent');
const multer = require('multer');

const d = new Date(); 
const y = d.getFullYear();

const m = ['January', 'February', 'March',
'April', 'May', 'June', 'July', 'August',
'September', 'October', 'November', 'December'];


router.get('/', (req, res) => {
  try {
    if (req.session.loggedIn) {
      const event = readEvent(dbFile, req.query.idEvent);
      // Get event date from database for select on page
      const eventDay = event.date.split(" ")[0];
      const eventMonth = event.date.split(" ")[1];
      const eventYear = event.date.split(" ")[2];

      const username = req.session.username;
      const userPrivilege = readUser(dbFile, username).userPrivilege;
      res.render('includes/eventEditor', {title: 'Editor', eventDay, eventMonth, eventYear, m, y, username, userPrivilege, event})
    } else {
      const username = 'none';
      res.render('error', { title: 'Error', status: 403, msg: 'Access denied.', username });
    }
  } catch (e) {
    const username = 'none';
    res.render('error', { title: 'Error', status: 404, msg: 'Page not found!', username});
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

router.post('/', upload.single('file'), (req, res) => {
  if (req.session.loggedIn) {
    const date = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const evDate = `${date} ${month} ${year}`
    const image = `${req.body.idEvent}` + '.jpg'
    updateEvent(dbFile, req.body.idEvent, req.body.name, req.body.description, evDate, image); 
    res.redirect('/')
  } else {
    const username = 'none';
    res.render('error', { title: 'Error', status: 403, msg: 'Access denied.', username });
  }
});

module.exports = router;