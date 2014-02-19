// For lack of a better place, the data connection will be here for now.
// TODO we can make a 'models' folder with the mysql connector or a mock
//  in-memory db for testing (without having to install mysql locally)

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin'
});


// Select by id from the 'test' table
module.exports.testSelect = function(id) {
  connection.connect();
  connection.query('SELECT * FROM `carpool_db`.`test` WHERE `id` = ?', id, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows[0].text);
  });
  connection.end();
};


