// The wrapper around SQL queries to get data to/from the database

var mysql = require('mysql');

// TODO this should be a config file
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin'
});


// Select items matching the given fields JSON
module.exports.select = function(table, cols, callback) {
  connection.query('SELECT * FROM `carpool_db`.`' + table + '` WHERE ?', cols, function(err, rows, fields) {
    if (err) throw err;
    callback(rows, fields);
  });
}

