var pjlongApp = angular.module('pjlongApp', ['ngRoute', 'headroom', 'pjlongApp.controllers']);

pjlongApp.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
      .when('/', {
        templateUrl: '/templates/home.html',
        controller: 'homeCtrl'
      })
      .when('/resume', {
      	templateUrl: '/templates/resume.html',
      	controller: 'resumeCtrl'
      })
      .when('/rwby', {
        templateUrl: '/templates/rwby.html',
        controller: 'rwbyCtrl'
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
