const Database = require('better-sqlite3');

module.exports = function readEvents(dbFile,) {
  const db = new Database(dbFile);
  const sql = db.prepare(`SELECT id, name, day, month, year, image from events`);
  const events = sql.all();
  db.close();
  return events;
}