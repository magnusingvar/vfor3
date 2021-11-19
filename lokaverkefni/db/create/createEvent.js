const Database = require('better-sqlite3');

module.exports = function createEvent(dbFile, name, description, image, year, month, day) {
  const db = new Database(dbFile);
  const sql = db.prepare('INSERT INTO events(name, description, image, year, month, day) VALUES (?, ?, ?, ?, ?, ?);');
  const event = sql.run(name, description, image, year, month, day);
  const lastId = event.lastInsertRowid;
  db.close();
  return lastId;
};