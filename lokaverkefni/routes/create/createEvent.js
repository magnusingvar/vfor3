const express = require('express');
const path = require('path');
const createEvent = require('../../db/create/createEvent');
const router = express.Router();
const readUser = require('../../db/read/readUser');
const dbFile = path.join(__dirname, '../../db/database.db');

const d = new Date(); 
const y = d.getFullYear();

const m = ['January', 'February', 'March',
'April', 'May', 'June', 'July', 'August',
'September', 'October', 'November', 'December'];

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = readUser(dbFile, username).userPrivilege;
    res.render('create/event', { title: 'Create event', m, y, username} );
  } else {
    const username = 'none';
    const userPrivilege = readUser(dbFile, username);
    res.render('error', { title: 'Error', status: 403, msg: `You don't have permission to perform this action.`, username });
  }
});

router.post('/', (req, res) => {
  if (req.session.loggedIn) {
    const d = new Date(); 
    const date = req.body.day;
    console.log(date)
    const month = req.body.month;
    const year = req.body.year

    const evDate = `${date} ${month} ${year}`
    // const date = new Date(year, month, day).toString()
    createEvent(dbFile, req.body.name, req.body.description, 'imgNotFound.jpg', evDate);
    res.redirect('/')
  } else {
    const username = 'none';
    res.render('error', { title: 'Error', status: 403, msg: `You don't have permission to perform this action.`, username });
  }
})

module.exports = router;