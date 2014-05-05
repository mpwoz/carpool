/*
 * Serve JSON to our AngularJS client
 */
var rideModel = require('../models/ride'),
    tokenModel = require('../models/token'),
    feedbackModel = require('../models/feedback'),
    emailer = require('../email/email');

exports.listRides = function (req, res) {
  rideModel.fetchList(function(rows) {
    res.json(rows);
  });
};

/*
 * Get a single ride by id
 */
exports.getRide = function (req, res) {
  var id = req.params.id;
  rideModel.fetchRide(id, function(ride) {
    rideModel.getRiders(id, function(riders) {
      ride.riders = riders; // Add list of rider emails to the ride object
      res.json(ride);
    });
  });
};

/*
 * Get all the rides for a single user, by passing only their netID
 */
exports.getRidesByUser = function(req, res) {
  var user = req.params.netID+"@illinois.edu";
  rideModel.fetchRidesByUser(user, function(rides) {
    res.json(rides);
  });
};

/*
 * Create a new ride and persist it to the database
 * If successful, return the id of the new database row
 * Also create a confirmation token and send the verification email.
 */
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

/* 
 * Sends confirmation email to make sure the user wants to delete ride
 */
exports.sendDeleteEmail = function(req, res) {
    var getEmail;
    var ride_id = req.params.id;
        console.log(ride_id);

    rideModel.fetchRide(ride_id,function(result){
      getEmail = result.email;
    });
    console.log(getEmail);
    tokenModel.findTokenByRide(ride_id, function(result){
      var verifyURL = req.protocol + '://' + req.get('host') + '/api/deleteRide/' + result.token;
      emailer.sendDeletionEmail(getEmail, verifyURL);
    });
    res.send(200, { 'ride_id': ride_id });
};

/*
 * When a user clicks the emailed confirmation link, mark them as 'confirmed'
 */
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

/*
 * deletes everything in database associated to the token after confirmation email is sent.
 */
exports.deleteAllFromRide = function(req, res){
  var token = req.params.token;
  tokenModel.findToken(token, function(row) {
    rideModel.delete({'id':row.ride_id}, function(result) {
      rideModel.deleteAllRiders(row.ride_id, function(result){
        tokenModel.deleteToken({'ride_id':row.ride_id}, function(result){
          res.send(200, "success! your ride is deleted.");
        });
      });
    });
  });
};

/*
 * Add a rider to a specific ride in the database
 * The request should have fields
 *  'ride_id': the ID of the ride to add to
 *  'email': the email of the rider
 */
exports.addRider = function (req, res) {
  rideModel.addRider(req.body, function(result) {
    res.send(200, {'success': true});
  });
};


/*
 * Remove a rider from a specific ride. 
 * Request should have fields
 *  'ride_id': the ID of the ride to add to
 *  'email': the email of the rider
 */
exports.deleteRider = function (req, res) {
  rideModel.deleteRider(req.body, function(result) {
    res.send(200, {'success': true});
  });
};

/*
 * gets all the feedback for a specific email.
 */
exports.getFeedback = function(req, res) {
  var id = req.params.to;
  feedbackModel.getFeedbackForEmail(id, function(feedback) {
    res.json(feedback);
  });
};

/*
 * Set the feedback from one email to another. Request fields:
 *  from: The email leaving the feedback
 *  to: the email receiving the feedback
 *  ride_id: the id of the ride for feedback
 *  comment: the actual text of the feedback
 *  score: an integer score of the recipient
 */
exports.setFeedback = function(req, res){
  feedbackModel.setFeedback(req.body, function(result){
    res.send(200, {'success': true});
  });
};
