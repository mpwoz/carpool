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
      var startLocation = $scope.startLocation;
      var endLocation = $scope.endLocation;
      var seats = $scope.seats;
      var seatPrice = $scope.seatPrice;
      var departureTime = $scope.departureTime;
      var ride = {
        'email': email,
        'startLocation': startLocation,
        'endLocation': endLocation,
        'seats': seats,
        'seatPrice': seatPrice,
        'departureTime': departureTime
      }
      if (! $scope.newride_form.email.$error.pattern && ! $scope.newride_form.startLocation.$error.pattern &&
          ! $scope.newride_form.endLocation.$error.pattern && seats>0 && seatPrice>=0) {
        RideFactory.newRide(ride)
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
