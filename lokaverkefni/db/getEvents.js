const Database = require('better-sqlite3');

module.exports = function getEvents(dbFile, where) {
   const db = new Database(dbFile);
   const sql = db.prepare(`
      SELECT id, name, image, description, year, month, day
      from events
      ${where}`);
   const events = sql.all();
   db.close();
   return events;
};