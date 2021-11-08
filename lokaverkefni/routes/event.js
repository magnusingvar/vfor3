// const express = require('express');
// const router = express.Router();
// const path = require('path');
// const dbFile = path.join(__dirname, '../db/database.db');
// const getEvents = require('../db/getEvents');
// const Database = require('better-sqlite3');

// // const item = getEvents(dbFile);
// // const id = []
// // item.forEach((row) => {
// //   id.push(row);
// // })

// router.get('/:id', (req, res) => {
//   const db = new Database(dbFile);
//   const sql = db.prepare('SELECT id from events where id = ?');
//   const params = req.params.id;
//   const id = sql.all(params);
//   db.close();

//   res.render('event', { id })
// })


// module.exports = router;