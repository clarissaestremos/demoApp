myApp.controller('IndexController', ['supersonic', 'DataService', '$scope','SearchService', function(supersonic, DataService, $scope, SearchService) {

    var db = window.openDatabase("DB name",1, "Display name",200000);
    
    $scope.navbarTitle = "Home";
    
    $scope.yo = function() {
        alert("yey!!");  
    };
    
    $scope.changeToHome = function() {
        $scope.navbarTitle = "Home";  
    };
    $scope.changeToAbout = function() {
        $scope.navbarTitle = "About";  
    };
    $scope.changeToBrowse = function() {
        $scope.navbarTitle = "Browse";  
    };
    
    $scope.changeToSearch = function() {
        $scope.navbarTitle = "Search";  
    };
    $scope.changeToContact = function() {
        $scope.navbarTitle = "Contact";  
    };
    
    $scope.changeToFavorite = function() {
        $scope.navbarTitle = "Favorite";  
    };
    
    var list = [];
    $scope.browseArtist = [];
    $scope.listArtist1 = [];
    $scope.listArtist2 = [];
    $scope.numData1 = 0;
    $scope.numData2 = 0;
    $scope.numData3 = 0;

    $scope.search_input="";

    $scope.$watch('online', function(newStatus) {});
    
    DataService.getData().then(function(data) {

            $scope.browseArtist = data;

            var nativeJavascriptListArtist = data;
            var ul = document.getElementById("nativeAddArtist");

            for (var p in nativeJavascriptListArtist) {
                if( nativeJavascriptListArtist.hasOwnProperty(p) ) {
                  ul.innerHTML += "<a class='item item-thumbnail-left'><img src='"+nativeJavascriptListArtist[p].picture+"'/><h2>"+nativeJavascriptListArtist[p].name+"</h2></a>";
                } 
              } 
                        
            
        }, function(reason) {
            alert("There something wrong in the server or the connection.");
        });  
    
    $scope.search = function() {
            var dt = new Date();
            var timerMilliSec = dt.getMilliseconds()/1000;
            var timerSec = dt.getSeconds();
            $scope.timer = 0;
            SearchService.search($scope.search_input, timerMilliSec, timerSec).then(function(d) {
                
                $scope.listOfArtist1 = d.response;
                var dt2 = new Date();
                $scope.timer = d.timer.toFixed(2);
                $scope.numData1 = $scope.listOfArtist1.length;
            },function(e){alert(e.message);});

        };
    
    $scope.browseNative = function() {
        alert("native");
        getAllArtists.getAll().then(function(d) {    
            $scope.browseArtist = d.response;
            },function(e){alert(e.message);}
        );
    };
    
    $scope.browseRepeat = function() {

    };
    
    $("#btnClick").click(function(){
        var dt2 = new Date();
        var timerMilliSec2 = dt2.getMilliseconds()/1000;
        var timerSec2 = dt2.getSeconds();
        $scope.timer2 = 0;
        SearchService.search($scope.search_input, timerMilliSec2, timerSec2).then(function(d) {
                
                $scope.listOfArtist2 = d.response;
                $scope.timer2 = d.timer.toFixed(2);
                $scope.numData2 = $scope.listOfArtist2.length;
            },function(e){alert(e.message);});
    });

var onoff = 0;
    
    $(".dlBtn").click(function(){
        if(onoff == 0) {
            $(this).html("ON");
            $(this).css({ 'background-color': 'green' });
            onoff = 1;
        }
        else if(onoff == 1) {
            $(this).html("OFF");
            $(this).css({ 'background-color': 'gray' });
            onoff = 0;
        }
    });
    
}]);