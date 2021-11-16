const Database = require('better-sqlite3');

module.exports = function update(dbFile, id, name, description, imgLink) {
  const db = new Database(dbFile);
  const sql = db.prepare('UPDATE events SET name = ?, description = ?, imgLink = ? WHERE id = ?');
  sql.run(name, description, imgLink, id)
  db.close();
}