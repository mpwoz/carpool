// The wrapper around SQL queries to get data to/from the database

var mysql = require('mysql');

// TODO this should be in a config file
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'carpool_db'
});


module.exports.update = function(table, updateFields, whereFields, done) {
  connection.query('UPDATE ?? SET ? WHERE ?', [table, updateFields, whereFields], function(err, result) {
    if (err) console.log(err);
    done(result);
  });
}

module.exports.delete = function(query, done) {
  connection.query(query, function(err, result) {
    if (err) {
      console.log(err);
    }
    done(result);
  });
}

module.exports.insert = function(table, fields, done) {
  connection.query('INSERT INTO ?? SET ?', [table, fields], function(err, result) {
    if (err) console.log(err);
    done(result);
  });
}

// Select items matching the given fields JSON
module.exports.select = function(table, fields, done) {
  connection.query('SELECT * FROM ?? WHERE ?', [table, fields], function(err, rows, fields) {
    if (err) console.log(err);
    done(rows, fields);
  });
}


// Select all items, no WHERE clause
module.exports.selectAll = function(table, done) {
  connection.query('SELECT * FROM ??', table, function(err, rows, fields) {
    if (err) console.log(err);
    done(rows, fields);
  });
}

