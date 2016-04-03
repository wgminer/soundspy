var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);

        var username = $('.userNav__username').text();
        var currentlyPlaying = false;

        var sendToBackground = function (playing) {
            currentlyPlaying = playing;
            console.log("currently playing: " + playing.url);
            chrome.runtime.sendMessage(playing, function(response) {
                console.log(response);
            });
        }

        $('#transfer').bind('DOMSubtreeModified', function(e) {
            var uid = $('#uid').text();
            var token = $('#token').text();
            chrome.storage.local.set({firebaseAuthToken: token, firebaseUid: uid});
            window.location.href = 'chrome-extension://' + chrome.runtime.id + '/app.html#/feed';
        });

        $('.playControls').bind('DOMSubtreeModified', function(e) {
            if (e.target.innerHTML.length > 0) {

                $title = $('.playbackSoundBadge__title');
                $artwork = $('.playbackSoundBadge__avatar span')[0].style.backgroundImage;
                var src = $artwork.split('"')[1].replace(/50x50/g, '200x200');;
                var href = $title.attr('href');

                if (href) {

                    var playing = {
                        title: $title.attr('title'),
                        url: 'https://soundcloud.com' + $title.attr('href'),
                        artwork: src,
                        timestamp: Date.now()
                    }

                    if (currentlyPlaying === false || currentlyPlaying.url !== playing.url) {
                        sendToBackground(playing)
                    }
                }
            }
        });

    }
}, 10);
