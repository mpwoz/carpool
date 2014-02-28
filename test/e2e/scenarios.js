'use strict'

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to /rides when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/rides");
  });


  describe('rides', function() {

    beforeEach(function() {
      browser.get('/rides');
    });

    it('should render list of all rides when user navigates to /rides', function() {
      expect(element.all(by.css('[ng-view] .well')).first().getText()).
        toMatch(/list of all rides/);
    });

  });


  describe('newride', function() {

    beforeEach(function() {
      browser.get('/newride');
    });

    it('should render the new ride input form when user navigates to /newride', function() {
      var email_input = element(by.css('[ng-view] input[placeholder="Email"]'));
      expect(email_input.isDisplayed()).toBe(true);
    });

  });
});