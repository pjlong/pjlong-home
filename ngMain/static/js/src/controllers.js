angular.module('pjlongApp.controllers', []);

angular.module('pjlongApp.controllers').controller('homeCtrl', ['$scope', 'PageTitle', function ($scope, PageTitle) {
  PageTitle.set('Home');
  $scope.test = 'Hello World!';

}]);

angular.module('pjlongApp.controllers').controller('menuCtrl', ['$scope', '$location', function ($scope, $location) {
  $scope.isActive = function (path) {
    if ($location.path() == path) {
      return true;
    } else {
      return false;
    }
  };

  $scope.items = [
    {
      url: '/',
      name: 'Home',
      theme: 'light'
    },
    {
      url: '/resume',
      name: 'Resume',
      theme: 'dark'
    },
    {
      url: '/rwby',
      name: 'RWBY',
      theme: 'light'
    }
  ];
}]);

angular.module('pjlongApp.controllers').controller('resumeCtrl', ['$scope', 'PageTitle', function ($scope, PageTitle) {
  PageTitle.set('My Resume');

  $scope.header = {
    name: "PHILLIP LONG",
    address: "11606 Cedar Spring Ct. Cupertino, CA 95014",
    link: "https://linkedin.com/in/phlong",
    email: "phil.long.09@gmail.com",
    phone: "(408) 899-9021"
  };

  $scope.resume = [
    {
      section: 'EDUCATION',
    },
  ];
}]);


angular.module('pjlongApp.controllers').controller('rwbyCtrl', ['$scope', '$window', 'PageTitle', function ($scope, $window, PageTitle) {
  PageTitle.set('RWBY');

  $scope.videoWidth = 640;
  $scope.videoHeight = 360;

  $scope.$on('$viewContentLoaded', function () {
    /*Load YouTube API if it doesn't exist*/
    var youTubeAPI = document.getElementById('www-widgetapi-script');
    if (!youTubeAPI) {
      $scope.loadYouTubeAPI();
    }

    /*Add Video Players to Array*/
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

    /*Add Click Listener to all Panels*/
    for (var i=0; i<panelNodes.length; i++) {
      panelNodes[i].addEventListener('click', panelClick, false);
    }

    if (youTubeAPI) {
      var rwbyApp = document.getElementById('rwby-trailer');
      rwbyApp.classList.add('yt-ready');
    }
  });

  $scope.loadYouTubeAPI = function () {
    var tag = document.createElement('script');
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
    tag.async = false;
    tag.onload = function () {
      var rwbyApp = document.getElementById('rwby-trailer');
      rwbyApp.classList.add('yt-ready');
    };
    tag.src = "https://www.youtube.com/iframe_api";


  };

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
