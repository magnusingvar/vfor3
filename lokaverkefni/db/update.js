const Database = require('better-sqlite3');

module.exports = function update(dbFile, id, name, description) {
  const db = new Database(dbFile);
  const sql = db.prepare('UPDATE events SET name = ?, description = ? WHERE id = ?');
  sql.run(name, description, id)
  db.close();
}