'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
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
  }).
  controller('RideListCtrl', function ($scope, RideFactory) {
    RideFactory.getRides().then(function (rides) {
      $scope.rides = rides.data;
    });
  }).
  controller('RideDetailCtrl', function($scope, $routeParams, RideFactory) {
    RideFactory.getRide($routeParams.rideID).then(function (ride) {
      $scope.ride = ride.data;
    });
  });
