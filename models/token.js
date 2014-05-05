var db = require('./mysql_db'),
    uuid = require('node-uuid');

/*
 * Create a token for a given ride and insert into database.
 */
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

/*
 * Delete the token that matches the column values in 'fields'
 * fields.ride_id: the ride id
 * fields.token: the actual token string
 * fields.created: timestamp of creation, generally optional
 */
module.exports.deleteToken = function(fields, done) {
  db.delete('token', fields, done);
}

/*
 * Return a specific token by its unique string. This allows you to
 * reverse lookup which ride prompted its creation
 */
module.exports.findToken = function(token, done) {
  db.select('token', { 'token': token }, function(rows, fields) {
    done(rows[0]);
  });
};

/*
 * Look up a token by the ride_id it's associated with, the opposite 
 * of findToken()
 */
module.exports.findTokenByRide = function(ride_id, done) {
  db.select('token', {'ride_id':ride_id}, function(rows, fields) {
    done(rows[0]);
  });
};
