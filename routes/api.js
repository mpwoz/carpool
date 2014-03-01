/*
 * Serve JSON to our AngularJS client
 */
var rideData = require('../models/rides');

// Create a new ride and persist it to the database
// If successful, return the id of the new row
exports.newRide = function (req, res) {
  rideData.insert(req.body, function(result) {
    if (result.affectedRows === 1) {
      res.send(200, {'id': result.insertId});
    } else {
      res.send(500, "Insert unsuccessful, check server logs.");
    }
  });
};
