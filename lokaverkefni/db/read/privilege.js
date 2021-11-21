const Database = require('better-sqlite3');

module.exports = function getUserInfo(dbFile, username) {
  const db = new Database(dbFile);
  const sql = db.prepare('SELECT id, userPrivilege from users where username = ?')
  const userInfo = sql.get(username);
  db.close();
  return userInfo;
};