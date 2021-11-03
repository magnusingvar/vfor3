
const Database = require('better-sqlite3');

module.exports = function getEvents(dbFile) {
  const db = new Database(dbFile);
  const sql = db.prepare('SELECT id, name from events');
  const events = sql.all();
  db.close();
  return events;
}