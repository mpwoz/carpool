angular.module('myApp.controllers')
  .controller('RideListCtrl', function ($scope, $modal, $location, RideFactory) {
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

  });