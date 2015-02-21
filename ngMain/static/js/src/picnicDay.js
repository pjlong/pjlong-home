angular.module('picnicDay', [])

.controller('picnicDayCtrl', ['$scope', function ($scope) {
    
}])

.directive('flipClock', [ function () {
    return {
        restrict: 'AEC',
        link: function (scope, el) {
            var diff = new Date (2015, 03, 18, 0, 0, 0) - Date.now();

            var flipClock = $(el).FlipClock(diff/1000, {
                clockFace: 'DailyCounter',
                countdown:true
            });
        }
    };
}])
;
