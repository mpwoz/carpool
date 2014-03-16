'use strict';

/* Filters */

angular.module('myApp.filters', [])
  .filter('MaxPrice', function() {
    return function (rides, rideByPrice) {
      var matchedRides = [];
      angular.forEach(rides, function(ride) {
        if (rideByPrice && ride.seatPrice <= rideByPrice.seatPrice) {
          matchedRides.push(ride);
        }
      });
      return matchedRides.length > 0 ? matchedRides : rides;
    }
  });