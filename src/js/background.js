var Background = (function () {

    var module = {};
    var ref = new Firebase('https://sound-spy.firebaseio.com/users');

    module.reset = function () {
        chrome.storage.local.set({firebaseAuthToken: null, firebaseUid: null});
    }

    module.save = function (uid, playing) {
        console.log(playing);
        ref.child(uid + '/playing')
            .set(playing);
        ref.child(uid + '/followers')
            .orderByChild('status')
            .equalTo('accepted')
            .once('value', function(snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    var follower = childSnapshot.val();
                    follower.uid = childSnapshot.key();
                    ref.child(follower.uid + '/following/' + uid + '/playing')
                        .set(playing);
                });
            }); 
    }

    module.init = function () {

        console.log('Initialized!');

        SC.initialize({
            client_id: 'b74dd64f32c066a42f13ed56d5d0e568'
        });

        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                console.log(request);
                sendResponse('Got it! Attempting to send "' + request.title + '" to FireBase');
                chrome.storage.local.get(['firebaseAuthToken', 'firebaseUid'], function(items) {
                    
                    authToken = items.firebaseAuthToken || null;
                    uid = items.firebaseUid || null;

                    // console.log(uid);
                    
                    if (uid && authToken) {
                        SC.resolve(request.url)
                            .then(function (data) {
                                
                                if (data.artwork_url) {
                                    var artwork_url = data.artwork_url;
                                } else {
                                    var artwork_url = data.user.avatar_url;
                                }

                                var playing = {
                                    url: data.permalink_url,
                                    artwork: artwork_url,
                                    title: data.title,
                                    username: data.user.username,
                                    started_at: Date.now()
                                }

                                console.log(data);

                                // Send to FireBase
                                module.save(uid, playing);

                            }, function (error) {

                                var playing = {
                                    url: request.url,
                                    artwork: request.artwork,
                                    title: request.title,
                                    username: false,
                                    started_at: Date.now()
                                }

                                console.log(error, playing);

                                // Send to FireBase
                                module.save(uid, playing);

                            });
                    } else {
                        console.log("Shoot! Auth token is not set.");
                    }
                });
            }
        );
    }

    return module;

})();

// Background.reset();

Background.init();