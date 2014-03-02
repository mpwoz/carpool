var path           = require('path')
  , templatesDir   = path.resolve(__dirname, '.', 'templates')
  , nodemailer     = require('nodemailer');

module.exports.sendConfirmationEmail = function(address, confirmURL) {
	    // ## Send a single email
      console.log('Send confirmation to ' + address);

	    // Prepare nodemailer transport object
	    var transport = nodemailer.createTransport("SMTP", {
	      service: "Gmail",
	      auth: {
          user: "carpoolingtest1@gmail.com",
          pass: "asdfasdf1231234"
	      }
	    });

	    // Send a single email
		transport.sendMail({
		  from: 'Carpooling <carpoolingtest1@gmail.com>',
		  to: address,
		  subject: 'Confirm your carpool.',
		  html: '<a href="'+ confirmURL+'"> Click here </a>',
		  text: "Click this link: "+ confirmURL
		}, function(err, responseStatus) {
		  if (err) {
		    console.log(err);
		  } else {
		    console.log(responseStatus.message);
		  }
		});
}
