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
            $scope.fail = "Failed to create ride.";
          });
      }
    }
  }).
  controller('SignupModalCtrl', function ($scope, $modalInstance, RideFactory, ride_id) {

    $scope.submit = function (email) {

      RideFactory.signup(ride_id, email)
        .success(function(data, status, headers, config) {
          $scope.success = true;
          $scope.ride_id = ride_id;
          $modalInstance.close($scope.success);
        }).error(function(data, status, headers, config) {
          $scope.success = false;
          $modalInstance.close($scope.success);
        });
    };

  }).
  controller('RideListCtrl', function ($scope, $modal, $location, RideFactory) {
    RideFactory.getRides().then(function (rides) {
      $scope.rides = rides.data;
    });

    $scope.goToRide = function(ride_id) {
        $location.path('/rides/' + ride_id);
    }

    $scope.openModal = function (ride_id) {
      var modalInstance = $modal.open({
        templateUrl: 'partials/rideSignupModal',
        controller: 'SignupModalCtrl',
        resolve: {
          ride_id: function () {
            return ride_id;
          }
        }
      });

      modalInstance.result.then(function (is_success) {
        if (is_success) {
          $scope.success = "Signed up for ride successfully.";
        }
        else {
          $scope.fail = "Ride signup failed.";
        }
      });
    };

  }).
  controller('UserProfileCtrl', function ($scope, $routeParams, RideFactory, FeedbackFactory) {
    var user = $routeParams.netID;
    $scope.user = user;
    RideFactory.getRidesByUser(user).then(function (rides) {
      $scope.rides = rides.data;
    });
    FeedbackFactory.getFeedback(user+'@illinois.edu').then(function(feedbacks) {
      $scope.feedbacks = feedbacks.data;
    });
  }).
  controller('RideDetailCtrl', function($scope, $routeParams, RideFactory) {
    RideFactory.getRide($routeParams.rideID).then(function (ride) {
      $scope.ride = ride.data;
    });
  });
