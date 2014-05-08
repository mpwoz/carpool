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

    // Filter dates based on what's currently selected in the datepicker
    $scope.dateFilter = function (row) {
      // No date selected, don't filter anything
      if ($scope.dt === null) {
        return true;
      }
      var rowTime = new Date(row.departureTime);
      var pickedTime = new Date($scope.dt);
      return (pickedTime.getDate() === rowTime.getDate() 
              && pickedTime.getMonth() === rowTime.getMonth());
    };

    $scope.dt = null; // Clear the date to begin with, no filter

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.opened = true;
    };

    $scope.dateOptions = {
      'year-format': "'yy'",
      'starting-day': 1,
      'show-weeks': false
    };

    $scope.formats = ['MMM dd, yyyy', 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
    $scope.format = $scope.formats[0];
  });
