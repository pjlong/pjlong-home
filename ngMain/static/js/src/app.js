var pjlongApp = angular.module('pjlongApp', ['ngRoute', 'headroom', 'pjlongApp.controllers', 'picnicDay']);

pjlongApp.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
      .when('/', {
        templateUrl: '/ng/home',
        controller: 'homeCtrl'
      })
      .when('/resume', {
      	templateUrl: '/ng/resume',
      	controller: 'resumeCtrl'
      })
      .when('/rwby', {
        templateUrl: '/ng/rwby',
        controller: 'rwbyCtrl'
      })
      .when('/pd', {
        templateUrl: '/ng/pd',
        controller: 'picnicDayCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
}]);

pjlongApp.factory('Page', function () {
  var title = "Home";
  return {
    title: function () { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});
