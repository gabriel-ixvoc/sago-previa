/* Keeps muted, inline videos eligible for autoplay after lazy sources are attached. */
(function () {
  function start(video) {
    if (!video.hasAttribute('autoplay') || video.dataset.userPaused === 'true') return;
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    var playback = video.play();
    if (playback && playback.catch) playback.catch(function () {});
  }

  document.querySelectorAll('video[autoplay]').forEach(function (video) {
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.addEventListener('loadeddata', function () { start(video); }, { once: true });
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) start(video);
  });
}());
