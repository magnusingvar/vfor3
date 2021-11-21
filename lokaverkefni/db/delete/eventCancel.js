const Database = require('better-sqlite3');

module.exports = function eventSignup(dbFile, idUser, idEvent) {
  const db = new Database(dbFile);
  const sql = db.prepare('DELETE FROM userEvents WHERE idUser = ? AND idEvent = ?');
  const test = sql.run(idUser, idEvent);
  db.close();
  return test;
};