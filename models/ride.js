var db = require('./mysql_db');

module.exports.delete = function(fields, done) {
  db.delete('ride', fields, done);
};

// Insert a ride with the given fields
module.exports.insert = function(fields, done) {
  if(!validateRideInsert(fields)) {
    done(null); // TODO pass an error
  } else {
    db.insert('ride', fields, done);
  }
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
};

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

module.exports.fetchRidesByUser = function(user, done) {
  db.select('ride', {"email": user}, function(rows, fields) {
    if(rows.length === 0) {
      done({});
    } else {
      done(rows);
    }
  });
};

module.exports.setConfirmed = function(id, done) {
  db.update('ride', {'confirmed': 1}, {'id': id}, done);
};

var validateRideInsert = function(fields) {
  var cityPattern = /^[A-Za-z]+,[ ]?[A-Za-z]{2,}$/;
  var emailPattern = /[a-zA-Z0-9]+@illinois.edu/;
  return  (fields.startLocation.match(cityPattern).length !== 0) &&
          (fields.endLocation.match(cityPattern).length !== 0) &&
          (fields.email.match(emailPattern).length !== 0) &&
          (fields.seats > 0) &&
          (fields.seatPrice >= 0);
}

module.exports.getRiders = function(ride_id, done) {
  db.select('rider', {ride_id: ride_id}, function(rows, fields) {
    done(
      //Pull out just the email field from each rider object
      rows.map(function(x) {
        return x.email;
      })
    );
  });
};

module.exports.addRider = function(fields, done) {
  db.insert('rider', fields, done);
};