/*
 * This class handles all the email sending functionality for our application.
 * Each specific email to send has its own function which populates it with
 * the correct text.
 */

var path           = require('path')
  , nodemailer     = require('nodemailer');

/*
 * Connection details for the email account
 */
var emailConfig = {
	      service: "Gmail",
	      auth: {
          user: "carpoolingtest1@gmail.com",
          pass: "asdfasdf1231234"
	      }
	    };

/*
 * Send the ride creation confirmation email
 */
module.exports.sendConfirmationEmail = function(address, confirmURL) {
  sendEmail(address, {
    subject: 'Confirm your carpool.',
    html: '<a href="'+ confirmURL+'"> Click here </a>',
    text: "Click this link: "+ confirmURL
  });
}

/*
 * Send the deletion confirmation email
 */
module.exports.sendDeletionEmail = function(address, confirmURL) {
  sendEmail(address, {
    subject: 'Carpool - Confirm your request to delete ride.',
    html: '<a href="'+ confirmURL+'"> Click here to delete your ride </a>',
    text: "Visit this page to delete your ride: "+ confirmURL
  });
}


/*
 * Private function for sending an email from our account.
 */
var sendEmail = function(address, options) {
  var transport = nodemailer.createTransport("SMTP", emailConfig);
  transport.sendMail({
      from: 'Carpooling <carpoolingtest1@gmail.com>',
      to: address,
      subject: options.subject || "Carpooling - error email",
      html: options.html || "<p>You should not receive this message, please contact carpool developers</p>",
      text: options.text || "You should not receive this message, please contact carpool developers",
  }, function(err, responseStatus) {
    if (err) {
      console.log(err);
    } else {
      console.log(responseStatus.message);
    }
  });		
}
