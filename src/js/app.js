var app = angular.module('sound-spy', ['firebase', 'ui.router']);

app.config(function ($compileProvider) {   
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
});

app.run(function ($rootScope, $firebaseObject, $window) {
    $rootScope.authData = false;

    var ref = new Firebase('https://sound-spy.firebaseio.com/users');

    var handleAuth = function (authToken) {
        ref.authWithCustomToken(authToken, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                $rootScope.authData = authData;
                $rootScope.$apply();
                console.log("Login Succeeded!", authData);
            }
        });
    }
    
    var handleLogin = function () {
        $window.location.href = 'http://localhost:3000/login.html';
    }

    chrome.storage.local.get(['firebaseAuthToken', 'firebaseUid'], function(items) {
        var authToken = items.firebaseAuthToken || null;
        var uid = items.firebaseUid || null;
        if (authToken && uid) {
            handleAuth(authToken);
        } else {
            handleLogin();
        }
    });

});

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
        .otherwise('/feed');
    $stateProvider
        .state('feed', {
            url: '/feed',
            templateUrl: 'views/feed.html',
            controller: 'FeedCtrl'
        })
        .state('followers', {
            url: '/followers',
            templateUrl: 'views/followers.html',
            controller: 'FollowersCtrl'
        })
        .state('following', {
            url: '/following',
            templateUrl: 'views/following.html',
            controller: 'FollowingCtrl'
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        })
        .state('profile.following', {
            url: '/following',
            templateUrl: 'views/profile.following.html'
        })
        .state('profile.followers', {
            url: '/followers',
            templateUrl: 'views/profile.followers.html'
        })
        .state('profile.options', {
            url: '/options',
            templateUrl: 'views/profile.options.html'
        });
        
});

app.controller('MastheadCtrl', function ($scope, $rootScope, $firebaseObject) {

    // Grab user
    var ref = new Firebase('https://sound-spy.firebaseio.com/users/' + $rootScope.authData.uid);
    $scope.feed = $firebaseObject(ref);
});

app.controller('FeedCtrl', function ($scope, $rootScope, $firebaseObject, $firebaseArray) {

    // Grab list of followers
    var ref = new Firebase('https://sound-spy.firebaseio.com/users/' + $rootScope.authData.uid);
    $scope.playing = $firebaseObject(ref.child('playing'));
    $scope.feed = $firebaseArray(ref.child('following'));

    
});

app.controller('ProfileCtrl', function ($scope, $rootScope, $firebaseObject, $firebaseArray) {

    var ref = new Firebase('https://sound-spy.firebaseio.com/users/' + $rootScope.authData.uid);
    $scope.user = $firebaseObject(ref);

    $scope.following = $firebaseArray(ref.child('following'));
    $scope.followers = $firebaseArray(ref.child('followers'));

    console.log($scope.following);

});

app.directive('tabs', function ($location) {
    return {
        restrict: 'E',
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