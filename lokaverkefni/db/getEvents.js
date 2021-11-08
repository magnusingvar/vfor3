const Database = require('better-sqlite3');

// Get all info about the event
const getAllInfo = (dbFile) => {
  const db = new Database(dbFile);
  const sql = db.prepare('SELECT * from events');
  const events = sql.all();
  db.close();
   return events;
}

// Get the event id
const getId = (dbFile, params) => {
   const db = new Database(dbFile);
   const sql = db.prepare('SELECT * from events where id = ?');
   const ids = sql.all(params);
   db.close();
   return ids;
}

module.exports = { getAllInfo, getId };

// // module.exports = function getEvents(dbFile) {
// //   const db = new Database(dbFile);
// //   const sql = db.prepare('SELECT id, name from events');
// //   const events = sql.all();
// //   db.close();
// //   return events;
// // }