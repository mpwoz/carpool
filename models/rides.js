var db = require('./mysql_db');

module.exports.select = function(fields, done) {
  db.select('ride', fields, done);
};
