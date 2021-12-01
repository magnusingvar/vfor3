const Database = require('better-sqlite3');

module.exports = function getEvents(dbFile, idEvent) {
   const db = new Database(dbFile);
   const sql = db.prepare(`
      SELECT id, name, image, description, day,
      month, year
      from events 
      where id = ?`);
   const event = sql.get(idEvent);
   db.close();
   return event;
};