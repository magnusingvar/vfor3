const Database = require('better-sqlite3');

module.exports = function createEvent(dbFile, name, description) {
  const db = new Database(dbFile);
  const sql = db.prepare('INSERT INTO events(name, description) VALUES (?, ?);');
  const event = sql.run(name, description);
  const lastId = event.lastInsertRowid;
  db.close();
  return lastId;
};