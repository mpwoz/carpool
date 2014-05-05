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

  describe('Signing up for a ride', function() {
    beforeEach(function() {
      browser.get('/rides');
    });

    it('should find a ride from Naperville and sign up for it', function() {
      var startlocation = element(by.id('startLocation'));
      startlocation.sendKeys("naperville");

      var buttons = element.all(by.css('.btn'));
      expect(buttons.count()).toBe(46);
      buttons.get(44).click();

      var modalWindow = element(by.css('.modal-dialog'));
      expect(modalWindow.isDisplayed()).toBe(true);

      var emailInput = element(by.model('email'));
      emailInput.sendKeys("test2@illinois.edu");
      buttons = element.all(by.css('.btn'));
      buttons.last().click();

      expect(element(by.id('messages')).getText()).toEqual('Signed up for ride successfully.');
      buttons = element.all(by.css('.btn'));
      buttons.last().click();

      var signedUpRiders = element.all(by.repeater('riderEmail in ride.riders'));
      signedUpRiders.then(function(arr){
        expect(arr[arr.length-1].getText()).toEqual("test2@illinois.edu Remove");
      });
    });
  });

  describe('Filtering by datepicker', function() {
    beforeEach(function() {
      browser.get('/rides');
    });

    it('should go to the rides page and filter by the date', function() {
      var datepicker = element(by.model('dt'));
      datepicker.click();

      var switchMode = element(by.css('.btn-block'));
      switchMode.click();

      var monthsButton = element.all(by.css('.btn-sm'));
      monthsButton.get(5).click();

      var daysButton = element.all(by.css('.btn-sm'));
      daysButton.get(17).click();

      var buttons = element.all(by.css('.btn'));
      buttons.get(50).click();

      var totalRows = element.all(by.repeater('ride in rides'));
      totalRows.then(function(arr) {
        expect(arr.length).toBe(2);
      });
    });
  });

  describe('Deleting a rider', function() {
    beforeEach(function() {
      browser.get('/rides/1');
    });

    it('should delete the last rider on the list of riders', function() {
      var buttons = element.all(by.css('.btn'));
      buttons.last().click();

      var signedUpRiders = element.all(by.repeater('riderEmail in ride.riders'));
      signedUpRiders.then(function(arr){
        expect(arr.length).toBe(4);
      });
    });
  });
});