
const Database = require('better-sqlite3');

module.exports = function getEvents(dbFile) {
  const db = new Database(dbFile);
  const sql = db.prepare('SELECT name from events');
  const events = sql.all();
  // for (let i = 0; i < events.length; i += 1) {
  //    const array = [];
  //    array.push(events[1]);
  //    console.log(array);
  //  }
  db.close();
  return events;

  // for (let i = 0; i< length.length; i += 1) {
  //   const array = [];
  //   array.push(length[i]);
  //   return array
  // }
  // db.close();
}