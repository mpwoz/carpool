'use strict';

/**
  Controller Unit Tests
*/
describe('myApp.controllers', function() {
  beforeEach(module('myApp.controllers'));
  beforeEach(module('myApp.factories'));


  /**
    NewRideCtrl Tests
  */
  describe('NewRideCtrl', function() {
    var scope, ctrl, factory;

    beforeEach(inject(function($rootScope, $controller, RideFactory) {
      scope = $rootScope.$new();
      factory = RideFactory;
      spyOn(factory, 'newRide');
      ctrl = $controller('NewRideCtrl', {$scope: scope, RideFactory: factory});
    }));

    describe('createRide', function() {
      it('should not POST to backend if email is invalid', function() {
        // [input email, is invalid email?]
        var invalid_emails = [['test@gmail.com', false], ['zuckerburg@harvard.edu', false], ['hello1@@asdf.com', true], ['asdf', true], ['12345', true], ['    blah@hello.com', true]];

        scope.newride_form = {'email': invalid_emails[0]};
        scope.newride_form.email = {};
        scope.newride_form.email.$error = {pattern: true};

        for(var i = 0; i < invalid_emails.length; i++) {
          scope.email = invalid_emails[i][0];
          scope.newride_form.email.$error.email = invalid_emails[i][1]
          scope.createRide();
          expect(factory.newRide).not.toHaveBeenCalled();
        }
      });

      it('should POST to backend if email is valid', function() {
        var valid_emails = ['hello1@illiois.edu', 'bajekal1@illinois.edu', 'sivakum3@illinois.edu'];

        scope.newride_form = {'email': valid_emails[0]};
        scope.newride_form.email = {};
        scope.newride_form.email.$error = {email: false, pattern: false};

        for(var i = 0; i < valid_emails.length; i++) {
          scope.email = valid_emails[i];
          scope.createRide();
          expect(factory.newRide).toHaveBeenCalled();
        }
      });

    });

  });


  /**
    NavCtrl Tests
  */
  describe('NavCtrl', function() {
    var scope, ctrl, location;

    beforeEach(inject(function($rootScope, $controller, $location) {
      scope = $rootScope.$new();
      location = $location;
      ctrl = $controller('NavCtrl', {$scope: scope});
    }));

    describe('isActive', function() {
      it('should check if the path is active', function() {
        location.path('/realRoute');
        expect(location.path()).toBe('/realRoute');
        expect(scope.isActive('/realRoute')).toBe(true);
        expect(scope.isActive('/fakeRoute')).toBe(false);
      });
    });
  });

});