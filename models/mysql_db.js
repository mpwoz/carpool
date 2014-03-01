// The wrapper around SQL queries to get data to/from the database

var mysql = require('mysql');

// TODO this should be in a config file
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'carpool_db'
});


// Select items matching the given fields JSON
module.exports.select = function(table, fields, callback) {
  connection.query('SELECT * FROM ?? WHERE ?', [table, fields], function(err, rows, fields) {
    if (err) console.log(err);
    callback(rows, fields);
  });
}


// Select all items, no WHERE clause
module.exports.selectAll = function(table, callback) {
  connection.query('SELECT * FROM ??', table, function(err, rows, fields) {
    if (err) console.log(err);
    callback(rows, fields);
  });
}
