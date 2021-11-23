const Database = require('better-sqlite3');

module.exports = function update(dbFile, id, name, description, date, image) {
  const db = new Database(dbFile);
  const sql = db.prepare('UPDATE events SET name = ?, description = ?, date = ?, image = ? WHERE id = ?');
  sql.run(name, description, date, image, id)
  db.close();
}