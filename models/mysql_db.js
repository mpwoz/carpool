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

module.exports.query = function(query, fields, done) {
  var q = connection.query(query, fields, function(err, result) {
    if (err) {
      console.log(err);
    }
    done(result);
  });
  console.log(q.sql);
};

module.exports.delete = function(table, fields, done) {
  var sql_string = "";

  // Creating the sql string w/ fields
  sql_string = sql_string.concat("DELETE FROM `");
  sql_string = sql_string.concat(table);
  sql_string = sql_string.concat("` WHERE ");

  for (i in fields) {
    var key = i;
    var val = fields[i];

    sql_string = sql_string.concat("`");
    sql_string = sql_string.concat(key);
    sql_string = sql_string.concat("`");
    
    if (typeof val === "number") {
      sql_string = sql_string.concat("=");
      sql_string = sql_string.concat(val);
    }
    else {
      sql_string = sql_string.concat("='");
      sql_string = sql_string.concat(val);
      sql_string = sql_string.concat("'");
    }

    sql_string = sql_string.concat(" AND ");
  }
  // Remove the last "AND" in the sql_string
  sql_string = sql_string.substring(0, sql_string.length - 5);
 
  var q = connection.query(sql_string, function(err, result) {
  //var q = connection.query('DELETE FROM ?? WHERE ?', [table, fields], function(err, result) {
    if (err) {
      console.log(err);
    }
    done(result);
  });
  console.log(q.sql);
}

module.exports.insert = function(table, fields, done) {
  var q = connection.query('INSERT INTO ?? SET ?', [table, fields], function(err, result) {
    if (err) console.log(err);
    done(result);
  });
  //console.log(q.sql);
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

