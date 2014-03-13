'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  }).
  controller('AppCtrl', function ($scope) {
  }).
  controller('NewRideCtrl', function ($scope, RideFactory) {
    $scope.createRide = function() {
      var email = $scope.email;
      if (! $scope.newride_form.email.$error.pattern) {
        RideFactory.newRide(email)
          .success(function(data, status, headers, config) {
            $scope.success = "Ride Created!";
          }).error(function(data, status, headers, config) {
            $scope.fail = "Failed to create ride :(";
          });
      }
    }
  });
