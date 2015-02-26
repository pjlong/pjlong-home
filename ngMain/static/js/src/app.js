var pjlongApp = angular.module('pjlongApp', ['ngRoute', 'headroom', 'pjlongApp.controllers']);

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
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
}]);

pjlongApp.factory('PageTitle', function () {
  var title = "Home";
  var siteName = "Pjlong.me";
  return {
    get: function () { return title + ' | ' + siteName; },
    set: function(newTitle) { title = newTitle; }
  };
})
;