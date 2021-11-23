const express = require('express');
const path = require('path');
const createEvent = require('../../db/create/createEvent');
const router = express.Router();
const dbFile = path.join(__dirname, '../../db/database.db');

router.get('/', (req, res) => {
  res.render('create/event', { title: 'Create event'} );
});

const m = ['January', 'February', 'March',
'April', 'May', 'June', 'July', 'August',
'September', 'October', 'November', 'December'];


router.post('/', (req, res) => {
  const d = new Date(); 
  const date = req.body.day;
  console.log(date)
  const month = m[req.body.month-1];
  const year = req.body.year

  const evDate = `${date} ${month} ${year}`
  // const date = new Date(year, month, day).toString()
  createEvent(dbFile, req.body.name, req.body.description, 'imgNotFound.jpg', evDate);
  res.redirect('/')
})

module.exports = router;