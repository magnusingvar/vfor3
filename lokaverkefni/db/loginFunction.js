const Database = require('better-sqlite3');

module.exports = function loginUser(dbFile, username, password) {
    const db = new Database(dbFile);
    const sql = db.prepare('SELECT username, password FROM users WHERE username = ?');
    const user = sql.get(username);
    db.close();
    return user;
};