const Database = require('better-sqlite3');

module.exports = function checkPrivilege(dbFile, username) {
  const db = new Database(dbFile);
  const sql = db.prepare('SELECT userPrivilege from users where username = ?')
  const userPrivilege = sql.get(username);
  db.close();
  return userPrivilege;
};