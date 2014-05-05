angular.module('myApp.controllers')
  .controller('DatepickerDemoCtrl', function($scope) {
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