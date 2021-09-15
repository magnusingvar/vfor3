const colors = require('colors');
const sqlite3 = require('sqlite3').verbose();

module.exports = class Worker {
  constructor(dbName) {
    this.dbName = dbName;
  }

  createProduct(name) {
      const studio = [name];
      const sql = 'INSERT INTO products(name, stock) VALUES (?, ?)';
      const db = new sqlite3.Database(this.dbName, (err) => {
        if (err) {
          return console.error(colors.red(err.message));
        }
        console.log('Connected to the SQLite database'.green);
        return true;
      });

      db.run(sql, product, (err) => {
        if (err) {
          return console.log(colors.red(err.message));
        }
        console.log(colors.green(product) + ' added to DB');
        return true;
      });

      db.close((err) => {
        if (err) {
          return console.error(colors.red(err.message));
        }
        console.log('Close the database connection'.green);
        return true;
      });
  }
  updateProduct(id, name, stock) {
    const product = [name, stock, id];
    const sql = 'UPDATE products SET name = ? WHERE id = ?';

    const db = new sqlite3.Database(this.dbName, (err) => {
      if (err) {
        return console.error(colors.red(err.message));
      }
      console.log('Connected to the SQLite database'.green);
      return true;
    });

    db.run(sql, product, (err) => {
      if (err) {
        return console.log(colors.red(err.message));
      }
      console.log(`Row updated with new info: ${product}`.green);
      return true;
    });

    db.close((err) => {
      if (err) {
        return console.error(colors.red(err.message));
      }
      console.log('Close the database connection'.green);
      return true;
    });
  }
  /*
  readStudios(){
    const sql = 'SELECT id, name FROM studios ORDER BY name';
    let studios = [];
    const db = new sqlite3.Database(this.dbName, (err) => {
      if (err) {
        return console.error(colors.red(err.message));
      }
      console.log('Connected to the SQLite database'.green);
      return true;
    });
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.log(colors.red(err.message));
      }
      console.log('Reading data from table'.green);
      rows.forEach((row) => {
        studios.push(row);
      })
      // colors.yellow(console.log(studios));
      return true;
    });
    db.close((err) => {
      if (err) {
        return console.error(colors.red(err.message));
      }
      console.log('Close the database connection'.green);
      return true;
    });
    return studios;
  }
  */
}