var firebase = new Firebase("https://arcade2013.firebaseio.com");
var arcadeApp = angular.module('arcadeApp', ["firebase"]);
var name = ""

arcadeApp.controller('ScoreController', ['$scope', '$filter', 'angularFire', 
        function ScoreController($scope, $filter, angularFire){
    $scope.players = [];
    $scope.sort = "-score";
    angularFire(firebase, $scope, "players");
    $scope.addPlayer = function() {
        if($filter('filter')($scope.players, {name:name})[0] != null){
            alert('You already exist!');
        } else {
            $scope.players.push({name: name, score: 0, puzzle: {'holder':0}});
        }
        window.location = "http://9volt-developers.com/arcade2013/scores.html";
    };
    $scope.addPoints = function() {
        var p = $filter('filter')($scope.players, {name: name})[0];
        var date = p.puzzle[$scope.puzzle];
        // no rescoring for 30min
        if(date != null && new Date().getTime() - date > 1800000){
            p.puzzle[$scope.puzzle] = new Date().getTime();
            p.score += $scope.points;
        } else if (date == null){
            p.puzzle[$scope.puzzle] = new Date().getTime();
            p.score += $scope.points;
        } else {
            alert("Please wait 30min before rescoring");
        }
        window.location = "http://9volt-developers.com/arcade2013/scores.html";
    };
}]);


angular.element(document).ready(function(){
    var cookie = cookieToObject(document.cookie);
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
