'use strict';

/* Filters */

angular.module('myApp.filters', [])
  .filter('maxPrice', function() {
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
  // filter('date', function() {
  //   return function (rides, depart) {
  //     var matchedRides = [];
  //     console.log(rides);
  //     angular.forEach(rides, function(ride) {
  //       var date = new Date(ride.departureTime);
  //       // if (depart && date.getDay() === depart.getDay() && date.getMonth() === depart.getMonth()) {
  //       //   matchedRides.push(ride);
  //       // }
  //     });
  //   }
  // });