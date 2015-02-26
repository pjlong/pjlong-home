angular.module('picnicDayApp', ['ngRoute'])

.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.html5Mode(true);
}])

.controller('picnicDayCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.picnicDayDate = new Date (2015, 03, 18, 0, 0, 0);
    $scope.today = new Date();


    /*
    Test url params to set current date to Picnic Day
     */
    if ("__itsPicnicDay" in $location.search() && $location.search().__itsPicnicDay == "true") {
        $scope.today = $scope.picnicDayDate;
    }

    $scope.itsPicnicDay = function () {
        
        return $scope.today.getFullYear() == $scope.picnicDayDate.getFullYear() &&
            $scope.today.getMonth() == $scope.picnicDayDate.getMonth() &&
            $scope.today.getDate() == $scope.picnicDayDate.getDate();
    };
}])


.directive('flipClock', [ function () {
    return {
        restrict: 'AEC',
        scope: {
            countdown: "="
        },
        link: function (scope, el, attrs) {
            var diff = scope.countdown - Date.now();

            var flipClock = $(el).FlipClock(diff/1000, {
                clockFace: 'DailyCounter',
                countdown: true
            });
        }
    };
}])
;
