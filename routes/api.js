/*
 * Serve JSON to our AngularJS client
 */
var rideModel = require('../models/ride'),
    feedbackModel = require('../models/feedback'),
    tokenModel = require('../models/token'),
    emailer = require('../email/email');

exports.listRides = function (req, res) {
  rideModel.fetchList(function(rows) {
    res.json(rows);
  });
};

// Get a single ride by id
// TODO in the future, this will also join on rider table, feedback, etc.
// to get more detail for the ride page
exports.getRide = function (req, res) {
  var id = req.params.id;
  rideModel.fetchRide(id, function(ride) {
    rideModel.getRiders(id, function(riders) {
      ride.riders = riders; // Add list of rider emails to the ride object
      res.json(ride);
    });
  });
};

exports.getRidesByUser = function(req, res) {
  var user = req.params.netID+"@illinois.edu";
  rideModel.fetchRidesByUser(user, function(rides) {
    res.json(rides);
  });
};

// Create a new ride and persist it to the database
// If successful, return the id of the new row
// Also handle creating a confirmation token and sending the email here
exports.newRide = function (req, res) {
  // TODO serverside validation

  // Insert the email into our database
  rideModel.insert(req.body, function(result) {
    if (result.affectedRows === 1) {

      // The ride's unique database ID
      var ride_id = result.insertId;

      // generate the token and email the user to confirm
      tokenModel.createToken(ride_id, function(token) {
        var verifyURL = req.protocol + '://' + req.get('host') + '/api/verify/' + token;
        emailer.sendConfirmationEmail(req.body.email, verifyURL);
      });
      res.send(200, { 'id': ride_id });
    } else {
      res.send(500, "Insert unsuccessful, check server logs.");
    }
  });
};


// When a user clicks the emailed confirmation link, mark them as 'confirmed'
exports.verify = function (req, res) {
  var token = req.params.token;
  tokenModel.findToken(token, function(row) {
    rideModel.setConfirmed(row.ride_id, function(result) {
      // TODO there needs to be error checking here
      //if (err) return res.redirect("verification-failure");
      res.send(200, "success! your account is verified.");
    });
  });
};

exports.addRider = function (req, res) {
  // TODO serverside validation
  rideModel.addRider(req.body, function(result) {
    // TODO verify email, similar to ride creation
  });
};

//gets all the feedback for a specific email.
exports.getFeedback = function(req, res) {
  var id = req.params.to;
  feedbackModel.getFeedbackForEmail(id, function(feedback) {
    res.json(feedback);
  });
};

exports.setFeedback = function(req, res){
  feedbackModel.setFeedback(req.body, function(result){

  });
};