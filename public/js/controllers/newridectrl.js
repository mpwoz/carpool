angular.module('myApp.controllers')
  .controller('NewRideCtrl', function ($scope, RideFactory) {
    $scope.createRide = function() {
      // Variables from entry fields
      var email = $scope.email;
      var startLocation = $scope.startLocation;
      var endLocation = $scope.endLocation;
      var seats = $scope.seats;
      var seatPrice = $scope.seatPrice;
      var departureTime = $scope.departureTime;

      // Pattern matching for correct values
      var isValidEmail = ! $scope.newride_form.email.$error.pattern;
      var isValidStartLoc = ! $scope.newride_form.startLocation.$error.pattern;
      var isValidEndLoc = ! $scope.newride_form.endLocation.$error.pattern;
      var isValidLocations = isValidStartLoc && isValidEndLoc;
      var seatsAvailable = seats > 0;
      var priceIsValid = seatPrice >= 0;

      var ride = {
        'email': email,
        'startLocation': startLocation,
        'endLocation': endLocation,
        'seats': seats,
        'seatPrice': seatPrice,
        'departureTime': departureTime
      }

      if (isValidEmail && isValidLocations && seatsAvailable && priceIsValid) {
        RideFactory.newRide(ride)
          .success(function(data, status, headers, config) {
            $scope.success = "Ride Created.";
          }).error(function(data, status, headers, config) {
            $scope.fail = "Failed to create ride.";
          });
      }
    }
  });