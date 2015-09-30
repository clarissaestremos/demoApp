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
    
    $scope.sample = function(){
        $scope.data1 = "Data1";   
        
    }
    
    $scope.touchStart = function() {
        $scope.timer1 = Date.now();
    }

    $scope.touchEnd = function() {
        $scope.timer1 = Date.now() - $scope.timer1;
    }
    
    var timer2;
    $("#btnClick").on('touchstart',function(e){
//         $scope.$apply(function () {  
            timer2 = Date.now();
//        });
    }).on('touchend',function(e){
//        $scope.$apply(function () {  
           timer2 = Date.now() - timer2;
            document.getElementById("delay").innerHTML = "Delay: "+timer2+"ms";
//        });
    });
    
    $("#btnClick").on('click',function(e){
//        $scope.$apply(function () {  
//            $scope.data2 = "Data2";
//        });
         document.getElementById("data").innerHTML = "Data2" ;
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

myApp.directive('testDirective', [function() {
                return function(scope, element, attr) {

                    element.on('touchstart', function(event) {
                        scope.$apply(function() { 
                            scope.$eval(attr.testDirective); 
                        });
                    });
                    
                    element.on('touchend', function(event) {
                        scope.$apply(function() { 
                           scope.$eval(attr.touchEnd); 
                        });
                    });
                };
            }]);
//myApp.directive('myTouchstart', [function() {
//                return function(scope, element, attr) {
//
//                    element.on('touchstart', function(event) {
//                        scope.$apply(function() { 
//                            scope.$eval(attr.myTouchstart); 
//                        });
//                    });
//                };
//            }]);
//
//myApp.directive('myTouchend', [function() {
//                return function(scope, element, attr) {
//
//                    element.on('touchend', function(event) {
//                        scope.$apply(function() { 
//                             scope.$eval(attr.myTouchend); 
//                        });
//                    });
//                };
//            }]);