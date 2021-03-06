var db = require('./mysql_db');

/*
 * Delete a ride by id
 */
module.exports.delete = function(fields, done) {
  db.delete('ride', fields, done);
};

/*
 * Insert a ride with the given fields
 */
module.exports.insert = function(fields, done) {
  if(!validateRideInsert(fields)) {
    done(null); // TODO pass an error
  } else {
    db.insert('ride', fields, done);
  }
};

/*
 * Select a ride by the JSON fields, which are translated into a WHERE clause
 */
module.exports.select = function(fields, done) {
  db.select('ride', fields, done);
};

/* 
 * Get a list of all rides, but only if they are confirmed
 */
module.exports.fetchList = function(done) {
  db.select('ride', {"confirmed": 1}, function(rows, fields) {
    done(rows);
  });
};

/*
 * Get a single ride by id
 */
module.exports.fetchRide = function(id, done) {
  db.select('ride', {"id": id}, function(rows, fields) {
    if (rows.length === 0) {
      done({});
    } else {
      done(rows[0]);
    }
  });
};

/*
 * Get all the rides for a given user email
 */
module.exports.fetchRidesByUser = function(user, done) {
  db.select('ride', {"email": user}, function(rows, fields) {
    if(rows.length === 0) {
      done({});
    } else {
      done(rows);
    }
  });
};

/*
 * Mark a given ride as 'confirmed', which means the user clicked the confirmation link
 */
module.exports.setConfirmed = function(id, done) {
  db.update('ride', {'confirmed': 1}, {'id': id}, done);
};

/*
 * Sanity check to make sure we are getting valid fields for a new ride.
 * Client already checks this, but this prevents malicious users from 
 * creating fake requests with bad data
 */
var validateRideInsert = function(fields) {
  var cityPattern = /^[A-Za-z]+,[ ]?[A-Za-z]{2,}$/;
  var emailPattern = /[a-zA-Z0-9]+@illinois.edu/;
  return  (fields.startLocation.match(cityPattern).length !== 0) &&
          (fields.endLocation.match(cityPattern).length !== 0) &&
          (fields.email.match(emailPattern).length !== 0) &&
          (fields.seats > 0) &&
          (fields.seatPrice >= 0);
}

/*
 * Get all the riders for a given ride_id
 */
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

/*
 * Add a rider to a given ride_id
 */
module.exports.addRider = function(fields, done) {
  db.insert('rider', fields, done);
};

/* 
 * Remove a rider from a ride
 * ride_id : The ID of the ride
 * email   : The rider's email
 */
module.exports.deleteRider = function(fields, done) {
  var query = "DELETE FROM `rider` WHERE `ride_id` = ? AND `email` = ?";
  var fields = [fields.ride_id, fields.email];
  db.query(query, fields, done);
};

/*
 * Remove all riders from a ride. Used when the driver deletes a ride they created
 */
module.exports.deleteAllRiders = function(ride_id, done) {
  var query = "DELETE FROM `rider` WHERE `ride_id` = ?";
  var fields = [ride_id];
  db.query(query, fields, done);
};
