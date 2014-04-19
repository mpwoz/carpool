'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap']).
  controller('NavCtrl', function ($scope, $location) {
    $scope.isActive = function(viewLocation) {
      return viewLocation === $location.path();
    };
  }).
  controller('NewRideCtrl', function ($scope, RideFactory) {
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
      $scope.globalRides = rides.data;
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
  }).
  controller('FeedbackCtrl', function($scope, FeedbackFactory) {
    $scope.addFeedback = function() {
      var fromUser = $scope.fromUser;
      var toUser = $scope.toUser;
      var score = $scope.score;
      var comment = $scope.comment;
      var rideId = $scope.rideId;

      var feedback = {
        'from': fromUser,
        'to': toUser,
        'ride_id': rideId,
        'comment': comment,
        'score': score
      }

      if (true) {
        FeedbackFactory.addFeedback(feedback)
          .success(function(data, status, headers, config) {
            $scope.success = "Feedback Submitted";
          }).error(function(data, status, headers, config) {
            $scope.fail = "Feedback information was not correct.";
          });
      }
    }
  }).
  controller('DatepickerDemoCtrl', function($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
      $scope.showWeeks = ! $scope.showWeeks;
    };

    $scope.clear = function () {
      $scope.dt = null;
    };

    $scope.chooseDate = function() {
      var date1 = new Date($scope.dt);
      var matchedRides = [];
      for(var i=0; i<$scope.globalRides.length; i++) {
        var date = new Date($scope.globalRides[i].departureTime);
        if (date1.getDate() === date.getDate() && date1.getMonth() === date.getMonth()) {
          matchedRides.push($scope.globalRides[i]);
        }
      }
      $scope.rides = matchedRides;
      $scope.$apply;
    }

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = ( $scope.minDate ) ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      'year-format': "'yy'",
      'starting-day': 1
    };

    $scope.formats = ['MMM dd, yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
    $scope.format = $scope.formats[0];
  });
