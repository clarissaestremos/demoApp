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
            var dt = new Date();
            var timer = dt.getMilliseconds();
            $scope.timer = 0;
            SearchService.search($scope.search_input, timer).then(function(d) {
                
                $scope.listOfArtist1 = d.response;
                var dt2 = new Date();
                $scope.timer = d.timer;
                $scope.numData1 = $scope.listOfArtist1.length;
            },function(e){alert(e.message);});

        }
    
    $("#btnClick").click(function(){
        var dt2 = new Date();
        var timer2 = dt2.getMilliseconds();
        $scope.timer2 = 0;
        SearchService.search($scope.search_input, timer2).then(function(d) {
                
                $scope.listOfArtist2 = d.response;
                $scope.timer2 = d.timer;
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