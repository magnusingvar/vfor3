const Database = require('better-sqlite3');

module.exports = function signUp(dbFile, idEvent, idUser) {
  const db = new Database(dbFile);
  const sql = db.prepare('INSERT INTO userEvents (idUser, idEvent) VALUES (?, ?)')
  sql.run(idUser, idEvent);
  db.close();
};