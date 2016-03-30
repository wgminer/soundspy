chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);

            var username = $('.userNav__username').text();
            var currentlyPlaying = false;

            var playStart = function (playing) {
                currentlyPlaying = playing;
                console.log("currently playing: " + playing.url);
            }

            $('.playControls').bind('DOMSubtreeModified', function(e) {
                if (e.target.innerHTML.length > 0) {

                    var href = $('.playbackSoundBadge__title').attr('href');
                    
                    if (typeof href !== 'undefined') {

                        var playing = {
                            user: username,
                            url: 'https://soundcloud.com' + href,
                            timestamp: Date.now()
                        }

                        if (currentlyPlaying === false || currentlyPlaying.url !== playing.url) {
                            playStart(playing)
                        }
                    }
                }
            });

        }
    }, 10);
});