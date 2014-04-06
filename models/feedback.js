var db = require('./mysql_db');

module.exports.setFeedback = function(fields, done) {
	db.insert('feedback', fields, done);
};

module.exports.getFeedbackForEmail = function(email, done) {
	db.select('feedback', {"to": email}, function(rows, fields) {
    done(rows);
  });
};