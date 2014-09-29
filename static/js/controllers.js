var pjlongApp = angular.module('pjlongApp', ['ngRoute']);

pjlongApp.config(['$routeProvider', '$locationProvider',
	function ($routeProvider, $locationProvider) {
		$routeProvider
      .when('/', {
        templateUrl: '/home.html',
        controller: 'homeCtrl'
      })
      .when('/rwby', {
        templateUrl: '/rwby.html',
        controller: 'rwbyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
	}]);

pjlongApp.controller('homeCtrl', ['$scope', 'Page', function ($scope, Page) {
  Page.setTitle('Home');
  $scope.test = 'Hello World!';

}]);

pjlongApp.controller('menuCtrl', ['$scope', function ($scope) {
  $scope.items = [
    {
      url: '/',
      name: 'Home'
    },
    {
      url: '#/resume',
      name: 'Resume'
    },
    {
      url: '#/rwby',
      name: 'RWBY'
    }
  ];
}]);

pjlongApp.factory('Page', function () {
  var title = "Home";
  return {
    title: function () { return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});

pjlongApp.controller('titleCtrl', ['$scope', 'Page', function ($scope, Page) {
  $scope.Page = Page;
}]);

pjlongApp.controller('rwbyCtrl', ['$scope', '$window', 'Page', function ($scope, $window, Page) {
  Page.setTitle('RWBY');
  $scope.videoWidth = 640;
  $scope.videoHeight = 360;

  $scope.$on('$viewContentLoaded', function () {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var panelNodes = document.getElementsByClassName("panel");
    var panelClick = function () {
      var panel = this;
      var curPlayer = player[this.getElementsByClassName('player')[0].id];
    
      if (document.getElementsByClassName('panel active').length > 0) {
        panel = document.getElementsByClassName('panel active')[0];
        curPlayer = player[panel.getElementsByClassName('player')[0].id];

        if (curPlayer.getPlayerState() == YT.PlayerState.PLAYING) {
          curPlayer.pauseVideo();
        }
      } else {
        panel.classList.add('active');
        document.getElementsByClassName('emblem '+panel.id)[0].classList.add('active');
        curPlayer.playVideo();
      }
    };

    for (var i=0; i<panelNodes.length; i++) {
      panelNodes[i].addEventListener('click', panelClick, false);
    }
  });

  $window.player = {};
  $window.onYouTubeIframeAPIReady = function () {
    var playerEl = document.getElementsByClassName('player');

    for (var i=0; i<playerEl.length; i++) {
      var el = playerEl[i];

      player[el.id] = new YT.Player(
        el.id, {
          height: $scope.videoHeight,
          width: $scope.videoWidth,
          videoId: el.getAttribute('data-video-id'),
          playerVars: {
            controls: 0,
            enablejsapi: 1,
            modestbranding: 0,
            rel: 0,
            showinfo: 0
          },
          events: {
            'onStateChange': onPlayerStateChange
          }
        }
      );
    }

    var rwbyApp = document.getElementById('rwby-trailer');
    rwbyApp.classList.add('yt-ready');
  };

  $window.onPlayerStateChange = function(event) {
    if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
      var panel, el = event.target.d;
      while (el && el.parentNode) {
        el = el.parentNode;
        if (el.classList.contains('panel')) {
          panel = el;
          break;
        }
      }

      if (panel) {
        panel.classList.remove('active');
        document.getElementsByClassName('emblem '+panel.id)[0].classList.remove('active');
      }
    }
  };
}]);