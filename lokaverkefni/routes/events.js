const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const getEvents = require('../db/getEvents');
const update = require('../db/update/updateEvent');
const deleteEvent = require('../db/delete/deleteEvent');
const multer = require('multer');
const checkPrivilege = require('../db/read/privilege');
const signup = require('../db/signup');

router.get('/', (req, res) => {
  let where = 'WHERE id';
  const events = getEvents(dbFile, where)

  // Check if user is logged in
  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = checkPrivilege(dbFile, username).userPrivilege;
    const header01 = 'Events'
	  const userValue = 'Log out';
    res.render('events', { title: 'Events', header01, userValue, events, userPrivilege})
  } else {
    const username = 'none';
    const userPrivilege = checkPrivilege(dbFile, username);
    const header01 = 'Events'
    const userValue = 'Login';
    res.render('events', { title: 'Events', header01, userValue, events, userPrivilege})
  }
});

router.get('/:id', (req, res) => {
  const params = req.params.id;
  const where = `WHERE id = ${params};`;
  const events = getEvents(dbFile, where);

  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = checkPrivilege(dbFile, username).userPrivilege;
    const userValue = 'Log out';
    res.render('event', { title: `${events.name}`, username, userValue, events, userPrivilege})
  } else {
    const username = 'none';
    const userPrivilege = checkPrivilege(dbFile, username);
    const userValue = 'Login';
    res.render('event', { title: 'a', username, userValue, events, userPrivilege})
  }
});

router.get('/:id/edit', (req, res) => {
  if (req.session.loggedIn) {
    const username = req.session.username;
    const userPrivilege = checkPrivilege(dbFile, username).userPrivilege;
    const userValue = 'Log out';
    const params = req.params.id;
    const where = `WHERE id = ${params};`;
    const events = getEvents(dbFile, where);
    res.render('includes/eventEditor', { username, userValue, events, userPrivilege })
  } else {
    res.render('error', { title: '401', status: '401', msg: 'Access denied'})
  }
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function(req, file, cb) {
    cb(null, req.params.id + '.jpg');
  }
});

const upload = multer({storage: storage})


router.get('/:id/signup', (req, res) => {
  if (req.session.loggedIn) {
    const user = "2";
    const params = req.params.id;
    console.log(params)
    signup(dbFile, user, params);
  } else {
    res.send('You need to sign in')
  }
});

router.post('/:id/update', upload.single('file'), (req, res) => {
  const params = req.params.id;
  const where = `WHERE id = ${params};`;
  const events = getEvents(dbFile, where);
  update(dbFile, params, req.body.newName, req.body.newDescription, req.params.id + ".jpg");
  res.redirect('/');
});

router.post('/:id/delete', (req, res) => {
  const params = req.params.id;
  console.log(params)
  deleteEvent(dbFile, params);
  res.redirect('/')
})

module.exports = router;