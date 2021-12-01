const Database = require('better-sqlite3');

module.exports = function createEvent(dbFile, name, description, image, day, month, year) {
  const db = new Database(dbFile);
  const sql = db.prepare('INSERT INTO events(name, description, image, day, month, year) VALUES (?, ?, ?, ?, ?, ?);');
  const event = sql.run(name, description, image, day, month, year);
  const lastId = event.lastInsertRowid;
  db.close();
  return lastId;
};