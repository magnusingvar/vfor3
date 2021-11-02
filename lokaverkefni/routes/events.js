const express = require('express');
const router = express.Router();
const path = require('path');
const dbFile = path.join(__dirname, '../db/database.db');
const Database = require('better-sqlite3');
const getEvents = require('../db/getEvents');

router.get('/', (req, res) => {
  if (req.session.loggedIn) {
	  const userValue = 'Log out';
    const db = new Database(dbFile);
    const sql = db.prepare('SELECT id, name from events');
    const item = sql.all();
    const events = [];
    item.forEach((row) => {
      events.push(row);
    })
    db.close();
    res.render('events', { title: 'Events', userValue, events})
  } else {
    const userValue = 'Log in';
    const db = new Database(dbFile);
    const sql = db.prepare('SELECT id, name from events');
    const item = sql.all();
    const events = [];
    item.forEach((row) => {
      events.push(row);
    });
    db.close();
    res.render('events', { title: 'Events', userValue, events})
  }
});

  // console.log(events)
  // const array = [];

  // for (let i = 0; i < events.length; i += 1) {
  //     array.push(events[i]);
  //   }
  // console.log(array[1].toString())

  // if (req.session.loggedIn) {
	// 	const userValue = 'Log out';
  //   res.render('events', { title: 'Events', userValue});
	// } else {
  //   const userValue = 'Log in';
  //   res.render('events', { title: 'Events', userValue});
  // }
// });

module.exports = router;