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

module.exports.delete = function(table, fields, done) {
  connection.query('DELETE FROM ?? WHERE ?', [table, fields], function(err, result) {
    if (err) console.log(err);
    done(result);
  });
}

module.exports.insert = function(table, fields, done) {
  if(table=='ride') {
    if(!validateRideInsert(fields)) {
      done(null);
    }
  }
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

function validateRideInsert(fields) {
  var cityPattern = /^[A-Za-z]+,[ ]?[A-Za-z]{2,}$/;
  var emailPattern = /[a-zA-Z0-9]+@illinois.edu/;
  return  (fields.startLocation.match(cityPattern).length !== 0) &&
          (fields.endLocation.match(cityPattern).length !== 0) &&
          (fields.email.match(emailPattern).length !== 0) &&
          (fields.seats > 0) &&
          (fields.seatPrice >= 0);
}
