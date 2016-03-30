// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });

// var SoundCloud = (function() {

//     var module = {}

//     module.getSong = function(url) {

//         SC.initialize({
//             client_id: 'e58c01b67bbc39c365f87269b927a868'
//         });

//         var deferred = $.Deferred();

//         SC.get('/resolve', { url: url }, function(data) {

//             console.log(data);

//             if (data.embeddable_by != 'me') {
//                 deferred.resolve(data);
//             } else {
//                 deferred.reject(false);
//             }

//         });

//         return deferred.promise();

//     }

//     return module;

// })();