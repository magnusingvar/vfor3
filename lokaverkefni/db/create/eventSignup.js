const Database = require('better-sqlite3');

module.exports = function eventSignup(dbFile, idUser, idEvent) {
  const db = new Database(dbFile);
  const sql = db.prepare('INSERT INTO userEvents (idUser, idEvent) VALUES (?, ?);');
  const test = sql.run(idUser, idEvent);
  const lastId = test.lastInsertRowid;
  db.close();
  return lastId;
};