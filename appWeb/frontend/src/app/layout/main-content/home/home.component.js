$('.signin').hover(function() {}, function() {
  $(this).addClass('animateout');
  setTimeout(function() {
    $('.signin').removeClass('animateout');
  }, 750);
});

$('.signin').on('click', function() {
  $('.overlay').toggleClass('active');
  $('signinform-field').removeClass('focus');
  $('input').val('');
  return false;
});
$('input').focus(function() {
  $(this).parent().addClass('focus');
}).blur(function() {
  if ($(this).val() == '') {
    $(this).parent().removeClass('focus');
  }
  if ($('#fdEmail').val() != '' && $('#fdPassword').val() != '') {
    $('#btSubmit').addClass('active');
  } else {
    $('#btSubmit').removeClass('active');

  }
});
$('#btSubmit').on('click', function() {
  return false;
});
$('#btCancel').on('click', function() {
  $('.overlay').removeClass('active');
  return false;
});

   var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      var player;
      function onYouTubePlayerAPIReady() {
        player = new YT.Player('video', {
          playerVars: { 'autoplay': 1, 'controls': 1,'autohide':1,'wmode':'opaque' },
          videoId: 'JW5meKfy3fY',
          events: {
            'onReady': onPlayerReady}
        });
      }

      function onPlayerReady(event) {
        event.target.mute();
      }
