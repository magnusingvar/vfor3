const Database = require('better-sqlite3');
const bcrypt = require('bcrypt');

module.exports = function registerUser(dbFile, username, password) {
  const db = new Database(dbFile);
  const salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  const sql = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
  sql.run(username, hash);
  db.close();
  return hash;
};