const Database = require('better-sqlite3');

module.exports = function createEvent(dbFile, name, description, image, date) {
  const db = new Database(dbFile);
  const sql = db.prepare('INSERT INTO events(name, description, image, date) VALUES (?,?, ?, ?);');
  const event = sql.run(name, description, image, date);
  const lastId = event.lastInsertRowid;
  db.close();
  return lastId;
};