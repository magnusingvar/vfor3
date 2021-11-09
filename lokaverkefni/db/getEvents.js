const Database = require('better-sqlite3');

module.exports = function getEvents(dbFile, where) {
   const db = new Database(dbFile);
   const sql = db.prepare(`
      SELECT id, name, imgLink, description
      from events
      ${where}`);
   const events = sql.all();
   db.close();
   return events;
}

// Get all info about the event
// const getAllInfo = (dbFile) => {
//   const db = new Database(dbFile);
//   const sql = db.prepare('SELECT * from events');
//   const events = sql.all();
//   db.close();
//    return events;
// }

// // Get the event id
// const getId = (dbFile, params) => {
//    const db = new Database(dbFile);
//    const sql = db.prepare('SELECT * from events where id = ?');
//    const ids = sql.all(params);
//    db.close();
//    return ids;
// }

// module.exports = { getAllInfo, getId };
