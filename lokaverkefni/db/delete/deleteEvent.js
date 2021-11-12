const Database = require('better-sqlite3');

module.exports = function deleteEvent(dbFile, idEvent) {
  const db = new Database(dbFile);
  const sql = db.prepare('DELETE from events WHERE id = ?');
  sql.run(idEvent);
  db.close();
};