myApp.controller('IndexController', ['supersonic', 'DataService', '$scope','SearchService', function(supersonic, DataService, $scope, SearchService) {

    var db = window.openDatabase("DB name",1, "Display name",200000);
    
    var list = [];
    $scope.browseArtist = [];
    $scope.listArtist1 = [];
    $scope.listArtist2 = [];
    $scope.numData1 = 0;
    $scope.numData2 = 0;

    $scope.search_input="";

    $scope.$watch('online', function(newStatus) {});
    DataService.getData().then(function(data) {
                    
                    $scope.$apply(function () {  
                        $scope.browseArtist = data;
                    });
                    
                    var nativeJavascriptListArtist = data;
                    var ul = document.getElementById("nativeAddArtist");

                    for (var p in nativeJavascriptListArtist) {
                        if( nativeJavascriptListArtist.hasOwnProperty(p) ) {
                          ul.innerHTML += "<li>"+"<img src='"+nativeJavascriptListArtist[p].picture+"'/><br>"+nativeJavascriptListArtist[p].name+"</li>";
                        } 
                      } 
                        
            
        }, function(reason) {
            alert("There something wrong in the server or the connection.");
        });  
    
    $scope.search = function() {
            SearchService.search($scope.search_input).then(function(d) {
                
                $scope.listOfArtist1 = d.response;
                $scope.numData1 = $scope.listOfArtist1.length;
            },function(e){alert(e.message);});

    }
    
    $scope.searchPage = function() {
        var view = new steroids.views.WebView("index.html#/search");
        steroids.drawers.hide({center: view});
        /*console.log("clicked");
        console.log($location.path());
        $location.path('/search');
        $location.replace();
        
        console.log($location.path());*/
    }
    
    $scope.searchFTS = function(){
        SearchService.searchFTS($scope.search_input).then(function(d) {
                
                $scope.listOfArtist2 = d.response;
                $scope.numData2 = $scope.listOfArtist2.length;
            },function(e){alert(e.message);});
    }
    
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
            $("progressBar").css({ 'width': '+=60%' });
            onoff = 1;
        }
        else if(onoff == 1) {
            $(this).html("OFF");
            $(this).css({ 'background-color': 'gray' });
            onoff = 0;
        }
    });

          
}]);