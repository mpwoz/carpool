'use strict'

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('carpool', function() {

  browser.get('index.html');

  it('should automatically redirect to /home when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/home");
  });

  describe('Creating a new ride', function() {

    beforeEach(function() {
      browser.get('/newride');
    });

    var email_input = element(by.model('email'));

    it('should not submit the form if the email is invalid', function() {
      var invalid_emails = ['hello1@@asdf.com', 'asdf', '12345', '    blah@#hello.com'];

      for(var i = 0; i < invalid_emails.length; i++) {
        email_input.sendKeys(invalid_emails[i]);
        var error_text = element(by.css('.error'));
        expect(error_text.isDisplayed()).toBe(true);
        email_input.clear();
      }
    });

    it('should only submit the form if the email is valid', function() {
      var valid_emails = ['hello1@illinois.edu', 'bajekal1@illinois.edu', 'sivakum3@illinois.edu'];

      for(var i = 0; i < valid_emails.length; i++) {
        email_input.sendKeys(valid_emails[i]);
        var error_text = element(by.css('.error'));
        // Pause to allow RegEx to be checked
        setTimeout(function() {
          expect(error_text.isDisplayed()).toBe(false);
        },1000);
        email_input.clear();
      }
    });

  });
});