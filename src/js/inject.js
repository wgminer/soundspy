console.log('Soundspy injected. Waiting for page to load...');

var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {

        console.log('Page loaded!');

        clearInterval(readyStateCheckInterval);

        var clearLocalStorage = function () {
            console.log('Clearing storage');
            chrome.storage.local.set({firebaseAuthToken: null, firebaseUid: null});
        };

        var setupAuthTransferEvent = function () {
            console.log('Watching');

            var injectTransferHandler = function () {
                var authData = {
                    uid: $('#uid').text(),
                    token: $('#token').text()
                };

                if (authData.uid.length > 0 && authData.token.length > 0) {
                    $('#transfer').unbind('DOMSubtreeModified', injectTransferHandler);
                    console.log(authData);
                    chrome.storage.local.set({firebaseAuthToken: authData.token, firebaseUid: authData.uid}, function () {
                        $('#uid, #token').text('transfered');
                    });
                }

                
            }

            $('#transfer').bind('DOMSubtreeModified', injectTransferHandler)
        }

        switch(window.location.pathname) {
            case '/signup.html':
            case '/login.html':
                setupAuthTransferEvent();
                break;
            case '/logout.html':
                clearLocalStorage();
                break;
        }

        var currentlyPlaying = false;
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
