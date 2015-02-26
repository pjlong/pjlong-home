angular.module('picnicDayApp', [])

.controller('picnicDayCtrl', ['$scope', function ($scope) {
    $scope.picnicDayDate = new Date (2015, 03, 18, 0, 0, 0);

    $scope.itsPicnicDay = function () {
        var today = new Date();
        
        return today.getFullYear() == $scope.picnicDayDate.getFullYear() &&
            today.getMonth() == $scope.picnicDayDate.getMonth() &&
            today.getDate() == $scope.picnicDayDate.getDate();
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
