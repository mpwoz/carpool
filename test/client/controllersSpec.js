'use strict';


/* NavCtrl tests */
describe('NavCtrl', function() {
  var $scope, $location, $rootScope, createController;

  beforeEach(module('myApp.controllers'));

  beforeEach(inject(function($injector) {
    $location = $injector.get('$location');
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function() {
      return $controller('NavCtrl', {
        '$scope': $scope
      });
    };
  }));

  describe('isActive', function() {
    it('should check if the path is active', function() {
      var controller = createController();
      $location.path('/realRoute');
      expect($location.path()).toBe('/realRoute');
      expect($scope.isActive('/realRoute')).toBe(true);
      expect($scope.isActive('/fakeRoute')).toBe(false);
    });
  });
});