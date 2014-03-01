var db = require('./mysql_db');

// Select a ride by the JSON fields, which are translated into a WHERE clause
module.exports.select = function(fields, done) {
  db.select('ride', fields, done);
};

module.exports.fetchList = function(done) {
  db.selectAll('ride', done);
}
