var firebase = new Firebase("https://arcade2013.firebaseio.com");
var arcadeApp = angular.module('arcadeApp', ["firebase"]);

arcadeApp.controller('ScoreController', ['$scope', 'angularFire', 
        function ScoreController($scope, angularFire){
    $scope.players = [];
    angularFire(firebase, $scope, "players");
    $scope.addPlayer = function() {
        $scope.players.push({user: name, score: 0});
    };
    $scope.addPoints = function() {

    };
}]);

angular.element(document).ready(function(){
    var cookie = cookieToObject(document.cookie);
    var name = "";
    if(cookie['name']){
        name = cookie['name'];
    } else {
        name = window.prompt("Your nickname?");
        createCookie(name);
    }
});

function cookieToObject(cookie){
    var dictionary = {};
    var c = cookie.split('; ');
    for(var i = 0; i < c.length; i++){
        var s = c[i].split('=');
        dictionary[s[0]] = s[1];
    }
    return dictionary;
}

function createCookie(name){
    var cookie = 'name=' + escape(name);
    document.cookie = cookie;
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 365);
    cookie = 'expires=' + exdate.toUTCString();
    document.cookie = cookie;
}
