angular.module('myApp.controllers').
  controller('RideDetailCtrl', function($scope, $routeParams, RideFactory) {
    $scope.setRide = function() {
      RideFactory.getRide($routeParams.rideID).then(function (ride) {
        $scope.ride = ride.data;
      });
    }
    $scope.setRide();

    $scope.removeFromRide = function(ride_id, user_email) {
      RideFactory.removeFromRide(ride_id, user_email)
        .success(function(data, status, headers, config) {
          $scope.success = true;
          $scope.setRide();
        }).error(function(data, status, headers, config) {
          $scope.success = false;
        });
    }

    $scope.deleteRide = function(ride_id) {
      RideFactory.deleteRide(ride_id).then(function (success) {
        $scope.rideDeleted = true;
      });
    }
  });