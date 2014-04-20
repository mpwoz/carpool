var db = require('./mysql_db'),
    uuid = require('node-uuid');

// Create a token for a given ride,
// and insert into database.
module.exports.createToken = function(ride_id, done) {
  var token = uuid.v4()
  db.insert('token', 
      { 
        'ride_id': ride_id,
        'token': token 
      }, 
      function(result) {
        done(token);
      });
};
module.exports.deleteToken = function(ride_id, done) {
  db.delete('token', ride_id, done);
}

module.exports.findToken = function(token, done) {
  db.select('token', { 'token': token }, function(rows, fields) {
    // TODO what if it's not in the table?
    done(rows[0]);
  });
};

module.exports.findTokenByRide = function(ride_id, done) {
  db.select('token', {'ride_id':ride_id}, function(rows, fields) {
    done(rows[0]);
  });
};
