const express = require('express');
const Worker = require('../db/Worker');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbFile = path.join(__dirname, '../db/database.db');

const router = express.Router();

// get index page
router.get('/', (req, res) => {
  const sql = 'SELECT id, name, stock FROM products ORDER BY name';
  let products = [];

  const db = new sqlite3.Database(dbFile, (err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Connected to the SQLite database'.green);
    return true;
  });

  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.log(colors.red(err.message));
    }
    console.log('Reading data from table'.green);
    rows.forEach((row) => {
      products.push(row);
    })
    // colors.yellow(console.log(studios));
    res.render('stock', { title: 'Front page', products });
    return true;
  });

  db.close((err) => {
    if (err) {
      return console.error(colors.red(err.message));
    }
    console.log('Close the database connection'.green);
    return true;
  });

});

module.exports = router;