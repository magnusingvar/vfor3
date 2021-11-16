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
};