const Database = require('better-sqlite3');

module.exports = function update(dbFile, id, name, description, day, month, year, image) {
  const db = new Database(dbFile);
  const sql = db.prepare('UPDATE events SET name = ?, description = ?, day = ?, month = ?, year = ?, image = ? WHERE id = ?');
  sql.run(name, description, day, month, year, image, id)
  db.close();
}