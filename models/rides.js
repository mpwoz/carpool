var db = require('./mysql_db');

module.exports.select = function(fields, callback) {
  db.select('ride', fields, callback);
};
