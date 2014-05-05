var db = require('./mysql_db');

/*
 * Set the feedback using the db fields specified in 'initialize.sql'
 */
module.exports.setFeedback = function(fields, done) {
	db.insert('feedback', fields, done);
};

/*
 * Get all the feedback received by a given email address
 */
module.exports.getFeedbackForEmail = function(email, done) {
	db.select('feedback', {"to": email}, function(rows, fields) {
    done(rows);
  });
};
