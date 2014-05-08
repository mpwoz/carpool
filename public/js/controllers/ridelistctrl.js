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

    // Old DatePicker stuff
    $scope.today = function() {
      $scope.dt = new Date();
    };

    $scope.showWeeks = true;
    $scope.toggleWeeks = function () {
      $scope.showWeeks = ! $scope.showWeeks;
    };

    $scope.clear = function () {
      $scope.dt = null;
    };
    $scope.clear();

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
