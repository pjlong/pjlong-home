
var player = {};

$(function () {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

function onYouTubeIframeAPIReady() {
  $('.player').each(function () {
    player[$(this).attr('id')] = new YT.Player(
      $(this).attr('id'), {
        height: videoHeight,
        width: videoWidth,
        videoId: $(this).data('videoId'),
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
  });
};

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
    var $panel = $(event.target.d)
      .parents('.panel');
    $panel.removeClass('active');
    $('.emblem.'+$panel.attr('id')).toggleClass('active');
  }

  //if (event.data == YT.PlayerState.PLAYING) {} 
}

