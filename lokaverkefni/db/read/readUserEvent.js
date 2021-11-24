const Database = require('better-sqlite3');

module.exports = function checkIfExists(dbFile, where) {
  const db = new Database(dbFile);
  const sql = db.prepare(`
    SELECT id, name, image from events 
    INNER JOIN userEvents ON userEvents.idEvent = events.id
    ${where}`);
  // const sql = db.prepare('SELECT idUser, idEvent from userEvents WHERE idUser = ? AND idEvent = ?;');
  const events = sql.all();
  db.close();
  return events;
}