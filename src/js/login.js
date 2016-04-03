var ref;

var injectAuthData = function (authData) {
    $('#uid').text(authData.uid);
    $('#token').text(authData.token);
}; 

var createNewUser = function (user) {
    ref.child(user.uid).set({
        "name": user.facebook.displayName,
        "email": user.facebook.email,
        "picture": user.facebook.profileImageURL
    });
};

var launchLoginPopup = function () {
    ref.authWithOAuthPopup('facebook', function(error, authData) {
        if (error) {
            console.log('Login Failed!', error);
        } else {
            console.log('Authenticated successfully with payload:', authData);
            injectAuthData(authData)
            ref.child('users/' + authData.uid)
                .once('value', function(snapshot) {
                    if (snapshot.exists() == false) {
                        createNewUser(authData);
                    };  
                });
        }
    }, {
        scope: 'email,user_friends'
    });
};

var handleFacebookLogin = function () {
    if (ref.child('users').getAuth()) {
        var authData = ref.child('users').getAuth();
        injectAuthData(authData)
    } else {
        launchLoginPopup();
    }
}

$(function () {

    ref = new Firebase('https://sound-spy.firebaseio.com/users');
    ref.unauth();

    $('#login').click(function () {
        handleFacebookLogin();
    });

});