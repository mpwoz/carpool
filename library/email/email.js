var path           = require('path')
  , templatesDir   = path.resolve(__dirname, '.', 'templates')
  , emailTemplates = require('email-templates')
  , nodemailer     = require('nodemailer');

module.exports.sendemail = function() {
	emailTemplates(templatesDir, function(err, template) {

	  if (err) {
	    console.log(err);
	  } else {

	    // ## Send a single email

	    // Prepare nodemailer transport object
	    var transport = nodemailer.createTransport("SMTP", {
	      service: "Gmail",
	      auth: {
		user: "carpoolingtest1@gmail.com",
		pass: "asdfasdf1231234"
	      }
	    });

	    // An example users object with formatted email function
	    var locals = {
	      email: 'test1@dispostable.com',
	      name: 'testname'
	    };

	    // Send a single email
	    template('default', locals, function(err, html, text) {
	      if (err) {
		console.log(err);
	      } else {
		transport.sendMail({
		  from: 'Carpooling <carpoolingtest1@gmail.com>',
		  to: locals.email,
		  subject: 'This is a test carpooling email.',
		  html: html,
		  // generateTextFromHTML: true,
		  text: text
		}, function(err, responseStatus) {
		  if (err) {
		    console.log(err);
		  } else {
		    console.log(responseStatus.message);
		  }
		});
	      }
	    });


	//    // ## Send a batch of emails and only load the template once
	//
	//    // Prepare nodemailer transport object
	//    var transportBatch = nodemailer.createTransport("SMTP", {
	//      service: "Gmail",
	//      auth: {
	//        user: "some-user@gmail.com",
	//        pass: "some-password"
	//      }
	//    });
	//
	//    // An example users object
	//    var users = [
	//      {
	//        email: 'pappa.pizza@spaghetti.com',
	//        name: {
	//          first: 'Pappa',
	//          last: 'Pizza'
	//        }
	//      },
	//      {
	//        email: 'mister.geppetto@spaghetti.com',
	//        name: {
	//          first: 'Mister',
	//          last: 'Geppetto'
	//        }
	//      }
	//    ];
	//
	//    // Custom function for sending emails outside the loop
	//    //
	//    // NOTE:
	//    //  We need to patch postmark.js module to support the API call
	//    //  that will let us send a batch of up to 500 messages at once.
	//    //  (e.g. <https://github.com/diy/trebuchet/blob/master/lib/index.js#L160>)
	//    var Render = function(locals) {
	//      this.locals = locals;
	//      this.send = function(err, html, text) {
	//        if (err) {
	//          console.log(err);
	//        } else {
	//          transportBatch.sendMail({
	//            from: 'Spicy Meatball <spicy.meatball@spaghetti.com>',
	//            to: locals.email,
	//            subject: 'Mangia gli spaghetti con polpette!',
	//            html: html,
	//            // generateTextFromHTML: true,
	//            text: text
	//          }, function(err, responseStatus) {
	//            if (err) {
	//              console.log(err);
	//            } else {
	//              console.log(responseStatus.message);
	//            }
	//          });
	//        }
	//      };
	//      this.batch = function(batch) {
	//        batch(this.locals, templatesDir, this.send);
	//      };
	//    };
	//
	//    // Load the template and send the emails
	//    template('newsletter', true, function(err, batch) {
	//      for(var user in users) {
	//        var render = new Render(users[user]);
	//        render.batch(batch);
	//      }
	//    });

	  }
	});
}
