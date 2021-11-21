const Database = require('better-sqlite3');

module.exports = function checkIfExists(dbFile, idUser, idEvent) {
  const db = new Database(dbFile);
  const sql = db.prepare('SELECT idUser, idEvent from userEvents WHERE idUser = ? AND idEvent = ?;');
  const user = sql.get(idUser, idEvent);
  db.close();
  return user;
}