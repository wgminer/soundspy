try {
    Typekit.load({ async: true });
} catch(e) {

}

var app = angular.module('sound-spy', ['firebase', 'angularMoment']);

app.config(function ($compileProvider) {   
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
});

app.run(function ($rootScope, $firebaseArray, $window) {

    $rootScope.view = 'loading';
    $rootScope.user = false;
    $rootScope.siteUrl = 'http://localhost:3000';

    var ref = new Firebase('https://sound-spy.firebaseio.com/users');

    var handleNotAuthed = function () {
        chrome.tabs.create({url: $rootScope.siteUrl + '/signup.html'});
    }

    var setupFeed = function (authData) {
        $rootScope.view = 'feed';
        $rootScope.feed = $firebaseArray(ref.child(authData.uid + '/following'));
        $rootScope.$apply();
        console.log("Login Succeeded!");
    }

    var handleAuth = function (authToken) {
        ref.authWithCustomToken(authToken, function(error, authData) {
            if (error) {
                handleNotAuthed()
            } else {
                setupFeed(authData);
            }
        });
    }

    chrome.storage.local.get(['firebaseAuthToken', 'firebaseUid'], function(items) {
        var authToken = items.firebaseAuthToken || null;
        var uid = items.firebaseUid || null;
        if (authToken && uid) {
            handleAuth(authToken);
        } else {
            handleNotAuthed();
        }
    });

});

app.directive('item', function ($location) {
    return {
        restrict: 'C',
        link: function (scope, element, attrs) {
            $(element).focus();
        }
    }
});

app.directive('a', function ($location) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            $(element).click(function(){
                chrome.tabs.create({url: $(this).attr('href')});
                return false;
            });
        }
    }
});