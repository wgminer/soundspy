var app = angular.module('soundspy', ['firebase', 'ui.router', 'angularMoment']);

app.run(function ($rootScope, $window, $firebaseObject, $firebaseArray) {

    var ref = new Firebase('https://sound-spy.firebaseio.com');
    $rootScope.authData = ref.getAuth();

    if ($rootScope.authData) {
        $rootScope.user = $firebaseObject(ref.child('users/' + $rootScope.authData.uid));
    }

});


app.controller('IndexCtrl', function ($scope, $rootScope, $interval, $timeout) {

    var users = [
        {
            "picture": "https://randomuser.me/api/portraits/med/women/1.jpg",
            "name": "Miriam King",
            "playing": {
                "artwork": "https://i1.sndcdn.com/artworks-000143050783-0p20sv-large.jpg",
                "title": "Purity Ring - Bodyache (LIONE Remix)",
                "url": "http://soundcloud.com/iamlione/purity-ring-bodyache-lione-remix",
                "username": "LIONE"
            }
        },
        {
            "picture": "https://randomuser.me/api/portraits/med/women/2.jpg",
            "name": "Maeva Wilson",
            "playing": {
                "artwork": "https://i1.sndcdn.com/artworks-000124020435-gc80as-large.jpg",
                "title": "Aprés - Chicago (Technimatic Remix)",
                "url": "http://soundcloud.com/ukf/apres-chicago-technimatic-remix",
                "username": "UKF"
            }
        },
        {
            "picture": "https://randomuser.me/api/portraits/med/women/3.jpg",
            "name": "Claire Michel",
            "playing": {
                "artwork": "https://i1.sndcdn.com/artworks-000131296105-7oxlhr-large.jpg",
                "title": "Lxury & LA Priest - Show",
                "url": "http://soundcloud.com/greco-roman/lxury-la-priest-show",
                "username": "Greco-Roman"
            }
        },
        {
            "picture": "https://randomuser.me/api/portraits/med/women/4.jpg",
            "name": "Hannah Hall",
            "playing": {
                "artwork": "https://i1.sndcdn.com/artworks-000131738028-3nc4zo-large.jpg",
                "title": "Allure - By Surprise",
                "url": "http://soundcloud.com/allureproduction/allure-by-surprise",
                "username": "ALLURE"
            }
        },
        {
            "picture": "https://randomuser.me/api/portraits/med/men/1.jpg",
            "name": "John Pierce",
            "playing": {
                "artwork": "https://i1.sndcdn.com/artworks-000140468121-fcfcjv-large.jpg",
                "title": "ABGT 162 - Moon Boots Guest Mix",
                "url": "http://soundcloud.com/moonbootsmusic/abgt-162-moon-boots-guest-mix",
                "username": "Moon Boots"
            }
        },
        {
            "picture": "https://randomuser.me/api/portraits/med/men/2.jpg",
            "name": "Jordan Brunet",
            "playing": {
                "artwork": "https://i1.sndcdn.com/artworks-000022342159-njw096-large.jpg",
                "title": "Foster The People - Don't Stop (Oliver Remix)",
                "url": "http://soundcloud.com/weareoliver/foster-the-people-dont-stop",
                "username": "weareoliver"
            }
        },
        {
            "picture": "https://randomuser.me/api/portraits/med/men/3.jpg",
            "name": "Alex Schuster",
            "playing": {
                "artwork": "https://i1.sndcdn.com/artworks-000022342159-njw096-large.jpg",
                "title": "Foster The People - Don't Stop (Oliver Remix)",
                "url": "http://soundcloud.com/weareoliver/foster-the-people-dont-stop",
                "username": "weareoliver"
            }
        },
        {
            "picture": "https://randomuser.me/api/portraits/med/men/4.jpg",
            "name": "Oliver Tolonen",
            "playing": {
                "artwork": "https://i1.sndcdn.com/artworks-000140468121-fcfcjv-large.jpg",
                "title": "ABGT 162 - Moon Boots Guest Mix",
                "url": "http://soundcloud.com/moonbootsmusic/abgt-162-moon-boots-guest-mix",
                "username": "Moon Boots"
            }
        }
    ];

    var users = _.shuffle(users);
    $scope.feed = users.slice(0, 5);

    var i; 
    for(i = 0; i < $scope.feed.length; i++) {
        $scope.feed[i].playing.started_at = (Date.now() - (i * 36000));
    }

    var inject = $interval(function () {
        
        var newUser = users[i]
        newUser.playing.started_at = Date.now();
        $scope.feed.unshift(newUser);
        $scope.feed.pop();
        i++;

        if ($scope.feed.length == i - 1) {
            $interval.cancel(inject);
        }

    }, 2500);

});

app.controller('AuthCtrl', function ($scope, $rootScope, $window, $firebaseObject, $firebaseArray) {

    var ref = new Firebase('https://sound-spy.firebaseio.com/users');

    var injectAuthData = function (authData, callback) {
        $('#uid').text(authData.uid);
        $('#token').text(authData.token);
        $('#transfer').bind('DOMSubtreeModified', function(e) {
            console.log('Callback received');
            if ($('#uid').text() == 'transfered' && $('#token').text() == 'transfered' ) {
                callback();
                $('#transfer').unbind('DOMSubtreeModified');
            }
        });
    }; 

    var createNewUser = function (authData) {
        ref.child(authData.uid).set({
            'name': authData.facebook.displayName,
            'email': authData.facebook.email,
            'picture': authData.facebook.profileImageURL
        }, function () {
            $window.location.href = 'http://localhost:3000/find-friends.html';
        });
    };

    var launchLoginPopup = function () {
        ref.authWithOAuthPopup('facebook', function(error, authData) {
            if (error) {
                console.log('Login Failed!', error);
            } else {
                console.log(authData.uid);
                ref.child(authData.uid)
                    .on('value', function(snapshot) {
                        if (snapshot.exists() == false) {
                            injectAuthData(authData, function () {
                                createNewUser(authData);
                            });
                        } else {
                            injectAuthData(authData, function () {
                                $window.location.href = 'http://localhost:3000/profile.html';
                            });
                        }
                    });
            }
        }, {
            scope: 'email,user_friends'
        });
    };

    $scope.login = function () {
        if ($rootScope.authData) {
            injectAuthData($rootScope.authData, function () {
                $window.location.href = 'http://localhost:3000/profile.html';
            });
        } else {
            launchLoginPopup();
        }
    }

});

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
        .otherwise('/following');
    $stateProvider
        .state('following', {
            url: '/following',
            templateUrl: 'templates/following.html'
        })
        .state('followers', {
            url: '/followers',
            templateUrl: 'templates/followers.html'
        })
        
});

app.controller('ProfileCtrl', function ($scope, $rootScope, $window, $firebaseObject, $firebaseArray) {

    $scope.user = false;

    var ref = new Firebase('https://sound-spy.firebaseio.com');
    var authData = ref.getAuth();

    $scope.logout = function (e) {
        ref.unauth();
        $window.location.href = 'http://localhost:3000/logout.html';
        e.preventDefault();
    }

    if (authData) {
        $scope.user = $firebaseObject(ref.child('users/' + authData.uid));
        $scope.following = $firebaseArray(ref.child('users/' + authData.uid + '/following'));
        $scope.followers = $firebaseArray(ref.child('users/' + authData.uid + '/followers'));
    } else {
        $window.location.href = 'http://localhost:3000/login.html';
    }

});

app.controller('FindFriendsCtrl', function ($scope, $rootScope, $window, $firebaseObject, $firebaseArray) {

    // Put all that FB stuff here
    
});

app.directive('tabs', function ($location) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {

            var setTabs = function () {
                var segments = $location.path().split('/');
                scope.activeTab = segments[segments.length - 1];
                console.log(scope.activeTab);
            }

            setTabs();
            scope.$on('$stateChangeSuccess', function(){
                setTabs();
            });
        }
    }
});