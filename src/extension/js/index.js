try {
    Typekit.load({ async: true });
} catch(e) {
    console.log(e);
}

var app = angular.module('soundspy', ['firebase', 'ui.router', 'angularMoment']);

app.config(function ($compileProvider) {   
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
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
        .state('settings', {
            url: '/settings',
            templateUrl: 'templates/settings.html'
        })
        
});
