/*
 * Serve JSON to our AngularJS client
 */
var rideData = require('../models/rides');

exports.emails = function (req, res) {
  res.json({
    emails: ['martin.woz@gmail.com', 'wozniew1@illinois.edu']
  });
};

// Get all rides
exports.allRides = function(req, res) {
  res.json({
    test: 'testing'
  });
};

exports.newRide = function(req, res) {
  res.json({
    msg: 'endpoint hit'
  });
}
