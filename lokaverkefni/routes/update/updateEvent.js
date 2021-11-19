const express = require('express');
const router = express.Router();
const path = require('path');
const readEvent = require('../../db/read/readEvent');
const dbFile = path.join(__dirname, '../../db/database.db');
const checkPrivilege = require('../../db/read/privilege')
const updateEvent = require('../../db/update/updateEvent');
const multer = require('multer');

router.get('/', (req, res) => {
  const username = req.session.username;
  const userPrivilege = checkPrivilege(dbFile, username).userPrivilege;
  const event = readEvent(dbFile, req.query.idEvent);
  const userValue = 'Log out';
  res.render('includes/eventEditor', {title: 'test', userPrivilege, userValue, event})
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
  const year = req.body.year;
  const month = req.body.month;
  const day = req.body.day;
  const image = `${req.body.idEvent}` + '.jpg'
  updateEvent(dbFile, req.body.idEvent, req.body.name, req.body.description, year, month, day, image);  res.redirect('/')
})

module.exports = router;