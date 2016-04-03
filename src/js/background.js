var Faker = (function () {
    
    var module = {};
    var ref = new Firebase('https://sound-spy.firebaseio.com/users/facebook:10205747973113872');
    

    module.songs = [
        {
            "artwork": "https://i1.sndcdn.com/artworks-000155767858-uhdf03-large.jpg",
            "started_at": 1459576980158,
            "title": "Feed The Streets (prod. DEQUEXATRON X000 Bobby Raps & DJ Tiiiiiiiiiip)",
            "url": "http://soundcloud.com/hamburgerhelper/feed-the-streets-prod-dequexatron-1000",
            "username": "Helper"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000137989009-4nmiic-large.jpg",
            "started_at": 1459576990963,
            "title": "Journey",
            "url": "http://soundcloud.com/xangriffin/journey-original-mix-2",
            "username": "Xan Griffin"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000146060512-09m4i0-large.jpg",
            "started_at": 1459576995897,
            "title": "Feather",
            "url": "http://soundcloud.com/citylights_music/feather",
            "username": "Citylights"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000143050783-0p20sv-large.jpg",
            "started_at": 1459576997881,
            "title": "Purity Ring - Bodyache (LIONE Remix)",
            "url": "http://soundcloud.com/iamlione/purity-ring-bodyache-lione-remix",
            "username": "LIONE"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000129470126-dz5h8p-large.jpg",
            "started_at": 1459577000033,
            "title": "Nieah - Alright",
            "url": "http://soundcloud.com/chillwithus/nieah-alright",
            "username": "Chillwithus"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000022342159-njw096-large.jpg",
            "started_at": 1459577017930,
            "title": "Foster The People - Don't Stop (Oliver Remix)",
            "url": "http://soundcloud.com/weareoliver/foster-the-people-dont-stop",
            "username": "weareoliver"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000140468121-fcfcjv-large.jpg",
            "started_at": 1459577020691,
            "title": "ABGT 162 - Moon Boots Guest Mix",
            "url": "http://soundcloud.com/moonbootsmusic/abgt-162-moon-boots-guest-mix",
            "username": "Moon Boots"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000028633508-04slqy-large.jpg",
            "started_at": 1459577026367,
            "title": "Andrés - New For U",
            "url": "http://soundcloud.com/i-d-online-1/andres-new-for-u",
            "username": "i-D"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000138729533-rjolfn-large.jpg",
            "started_at": 1459577033657,
            "title": "Allure - Divine",
            "url": "http://soundcloud.com/allureproduction/allure-divine",
            "username": "ALLURE"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000131738028-3nc4zo-large.jpg",
            "started_at": 1459577040766,
            "title": "Allure - By Surprise",
            "url": "http://soundcloud.com/allureproduction/allure-by-surprise",
            "username": "ALLURE"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000117965476-5hotkv-large.jpg",
            "started_at": 1459577042323,
            "title": "Count On Me (Andy C Remix)",
            "url": "http://soundcloud.com/luckycoin/count-on-me-andy-c-remix",
            "username": "Mr. Small Pirate"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000131296105-7oxlhr-large.jpg",
            "started_at": 1459577044569,
            "title": "Lxury & LA Priest - Show",
            "url": "http://soundcloud.com/greco-roman/lxury-la-priest-show",
            "username": "Greco-Roman"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000131993260-mtl7qw-large.jpg",
            "started_at": 1459577048053,
            "title": "Quivver - Controlled Substance 006",
            "url": "http://soundcloud.com/quivver_john_graham/controlled-substance-006",
            "username": "QUIVVER"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000124020435-gc80as-large.jpg",
            "started_at": 1459577050477,
            "title": "Aprés - Chicago (Technimatic Remix)",
            "url": "http://soundcloud.com/ukf/apres-chicago-technimatic-remix",
            "username": "UKF"
        },
        {
            "artwork": "https://i1.sndcdn.com/artworks-000102653944-yfenaf-large.jpg",
            "started_at": 1459577052240,
            "title": "Code3000 - Everybody Get Up (Original Mix)",
            "url": "http://soundcloud.com/code3000/code3000-everybody-get-up-original-mix",
            "username": "Code3000"
        }
    ];

    module.users = {
        "1": {
            "name": "Will Miner",
            "following": {
                "2": {
                    "status": "accepted",
                    "name": "Matt Weiss",
                    "profile_picture": ""
                },
                "3": {
                    "status": "accepted",
                    "name": "Levina Li",
                    "profile_picture": ""
                }
            },
            "followers": {
                "2": {
                    "status": "accepted",
                    "name": "Matt Weiss",
                    "profile_picture": ""
                },
                "3": {
                    "status": "accepted",
                    "name": "Levina Li",
                    "profile_picture": ""
                }
            },
            "playing": {}
        },
        "2": {
            "name": "Matt Weiss",
            "following": {
                "1": {
                    "status": "accepted",
                    "name": "Will Miner",
                    "profile_picture": ""
                },
                "3": {
                    "status": "accepted",
                    "name": "Levina Li",
                    "profile_picture": ""
                }
            },
            "followers": {
                "1": {
                    "status": "accepted",
                    "name": "Will Miner",
                    "profile_picture": ""
                },
                "3": {
                    "status": "accepted",
                    "name": "Levina Li",
                    "profile_picture": ""
                }
            },
            "playing": {}
        },
        "3": {
            "name": "Levina Li",
            "following": {
                "1": {
                    "status": "accepted",
                    "name": "Will Miner",
                    "profile_picture": ""
                },
                "2": {
                    "status": "accepted",
                    "name": "Matt Weiss",
                    "profile_picture": ""
                }
            },
            "followers": {
                "1": {
                    "status": "accepted",
                    "name": "Will Miner",
                    "profile_picture": ""
                },
                "2": {
                    "status": "accepted",
                    "name": "Matt Weiss",
                    "profile_picture": ""
                }
            },
            "playing": {}
        }
    };

    module.users = function () {
        ref.set(module.users);
    }

    module.feed = function () {
        ref.child('following')
            .set({
                "test:1": {
                    name: "Levina Li",
                    picture: "https://scontent-lga3-1.xx.fbcdn.net/hprofile-xft1/v/t1.0-1/p100x100/10250041_10209225576700812_1186517109931377468_n.jpg?oh=7974c9a505f86dcc99061cbbb15bae44&oe=5778E9A7",
                    status: "accepted",
                    playing: module.songs[Math.floor(Math.random()*module.songs.length)]
                },
                "test:2": {
                    name: "Matt Weiss",
                    picture: "https://scontent-lga3-1.xx.fbcdn.net/hprofile-xpt1/v/t1.0-1/p100x100/11350552_2858800429103_3812935203008308595_n.jpg?oh=1090211207fa021377fbdbb050222de7&oe=577E2177",
                    status: "accepted",
                    playing: module.songs[Math.floor(Math.random()*module.songs.length)]
                }
            });
    }
 
    return module;

})();

var Background = (function () {

    var module = {};
    var ref = new Firebase('https://sound-spy.firebaseio.com/users');

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

    var iconClick = function () {
        chrome.storage.local.get(['firebaseAuthToken', 'firebaseUid'], function(items) {
            authToken = items.firebaseAuthToken || null;
            uid = items.firebaseUid || null;
            if (authToken && uid) {
                chrome.tabs.create({url: 'chrome-extension://' + chrome.runtime.id + '/app.html#/feed'});
            } else {
                chrome.tabs.create({url: 'http://localhost:3000/login.html'});
            }
        });
    }

    module.init = function () {

        SC.initialize({
            client_id: 'b74dd64f32c066a42f13ed56d5d0e568'
        });

        chrome.browserAction.onClicked.addListener(iconClick);

        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                console.log(request);
                sendResponse('Currently playing: ' + request.url);
                chrome.storage.local.get(['firebaseAuthToken', 'firebaseUid'], function(items) {
                    
                    authToken = items.firebaseAuthToken || null;
                    uid = items.firebaseUid || null;
                    
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
                        sendResponse('User not authed!');
                    }
                });
            }
        );
    }

    return module;

})();

Background.init();

Faker.feed();
setInterval(function () {
    Faker.feed();
}, 20000);