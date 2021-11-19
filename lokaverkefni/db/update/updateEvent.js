const Database = require('better-sqlite3');

module.exports = function update(dbFile, id, name, description, year, month, day, image) {
  const db = new Database(dbFile);
  const sql = db.prepare('UPDATE events SET name = ?, description = ?, year = ?, month = ?, day = ?, image = ? WHERE id = ?');
  sql.run(name, description, year, month, day, image, id)
  db.close();
}