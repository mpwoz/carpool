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

// Get a list of all rides, but only if they are confirmed
module.exports.fetchList = function(done) {
  db.select('ride', {"confirmed": 1}, function(rows, fields) {
    done(rows);
  });
}

// Get a single ride by id
module.exports.fetchRide = function(id, done) {
  db.select('ride', {"id": id}, function(rows, fields) {
    if (rows.length === 0) {
      // The ride doesn't exist, should probably return something more meaningful here
      done({});
    } else {
      done(rows[0]);
    }
  });
};

module.exports.setConfirmed = function(id, done) {
  db.update('ride', {'confirmed': 1}, {'id': id}, done);
}
