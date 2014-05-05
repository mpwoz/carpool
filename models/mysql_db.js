/*
 * The wrapper around SQL queries to get data to/from the database
 * This is the class that is responsible for interfacing with mysql, and is 
 * the least abstract way of representing our app's data. Successive layers
 * should abstract away the DB details. 
 */

var mysql = require('mysql');

/*
 *  Connect to the local database, we may need to change this if we want to
 *  support remote db.
 */
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'carpool_db'
});


/*
 * Generic update function for setting fields in a table. 
 */
module.exports.update = function(table, updateFields, whereFields, done) {
  connection.query('UPDATE ?? SET ? WHERE ?', [table, updateFields, whereFields], function(err, result) {
    if (err) console.log(err);
    done(result);
  });
}

/*
 * Generic function for making any db query (for special cases where the other 
 * functions won't work)
 */
module.exports.query = function(query, fields, done) {
  var q = connection.query(query, fields, function(err, result) {
    if (err) {
      console.log(err);
    }
    done(result);
  });
  console.log(q.sql);
};


/*
 * Generic delete query for deleting anything that 
 * matches 'fields' from 'table'
 */
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
    if (err) {
      console.log(err);
    }
    done(result);
  });
  console.log(q.sql);
}

/*
 * Generic insert query, specify table and fields (columns)
 */
module.exports.insert = function(table, fields, done) {
  var q = connection.query('INSERT INTO ?? SET ?', [table, fields], function(err, result) {
    if (err) console.log(err);
    done(result);
  });
}

/*
 * Generic select function, specify the table and the matching fields, and it 
 * will return all matches in a JSON array
 */
module.exports.select = function(table, fields, done) {
  connection.query('SELECT * FROM ?? WHERE ?', [table, fields], function(err, rows, fields) {
    if (err) console.log(err);
    done(rows, fields);
  });
}


/*
 * Select all items from a table, no WHERE clause
 */
module.exports.selectAll = function(table, done) {
  connection.query('SELECT * FROM ??', table, function(err, rows, fields) {
    if (err) console.log(err);
    done(rows, fields);
  });
}

