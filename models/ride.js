var db = require('./mysql_db');

module.exports.delete = function(fields, done) {
  db.delete('ride', fields, done);
};

module.exports.insert = function(fields, done) {
  db.insert('ride', fields, done);
};

// Select a ride by the JSON fields, which are translated into a WHERE clause
module.exports.select = function(fields, done) {
  db.select('ride', fields, done);
};

module.exports.fetchList = function(done) {
  db.selectAll('ride', done);
}

module.exports.setConfirmed = function(id, done) {
  db.update('ride', {'confirmed': 1}, {'id': id}, done);
}
