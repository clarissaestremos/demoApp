var myApp = angular.module('SteroidsApplication', [
  'supersonic', 'ngRoute'
]);

window.location.hash = "home";

myApp.run(function($window, $rootScope) {
      $rootScope.online = navigator.onLine;
      $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          $rootScope.online = false;
        });
      }, false);
      $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
          $rootScope.online = true;
        });
      }, false);
});

myApp.config(function($routeProvider) {
    
    $routeProvider
   
    .when('/home', {
        templateUrl: 'pages/index1.html',
        controller: 'IndexController'
    })
      
    
    .when('/about', {
        templateUrl: 'pages/about.html',
        controller: 'IndexController'
    })
    
    .when('/browse', {
        templateUrl: 'pages/browse.html',
        controller: 'IndexController'
    })
    
    .when('/search', {
        templateUrl: 'pages/search.html',
        controller: 'IndexController'
    })
    
    .when('/contact', {
        templateUrl: 'pages/contact.html',
        controller: 'IndexController'
    })
    
    .when('/native', {
        templateUrl: 'pages/native.html',
        controller: 'IndexController'
    })
    
    .when('/repeat', {
        templateUrl: 'pages/repeat.html',
        controller: 'IndexController'
    })
    
    .when('/favorite', {
        templateUrl: 'pages/favorite.html',
        controller: 'IndexController'
    })
    
    .when('/favorite2', {
        templateUrl: 'pages/favorite2.html',
        controller: 'IndexController'
    })
    
    .when('/favorite3', {
        templateUrl: 'pages/favorite3.html',
        controller: 'IndexController'
    })
    
});

myApp.service('DataService', function($http, $q) {
    var self = this;
    var db = window.openDatabase("DB name",1, "Display name",200000);
    
    self.getData = function(){
        var deferred = $q.defer(),
            url = 'https://glacial-harbor-7075.herokuapp.com/musicArtist/list';
        $http.get(url).success(function(result){
             db.transaction(function(transaction){
                transaction.executeSql("create table if not exists songArtist(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT)");
                transaction.executeSql("select * from songArtist", [], function(transaction,res) {
                   if (res.rows.length<1){ //first time to use the app
                        for(d of result){
                            transaction.executeSql("INSERT INTO songArtist (name, picture) values ('"+d.name+"', '"+d.picture+"')");
                        }
                      }
                });
             });
            
            deferred.resolve(result);
        }).error(function(err){
            deferred.reject(err);     
        });
        return deferred.promise;
    }
  return self;
});

myApp.service('SearchService', function($http, $q) {
    
    var db = window.openDatabase("DB name",1, "Display name",200000);
    var self = this;
    
    self.search= function(keyword, time) {
            
        
            var deferred = $q.defer();
            db.transaction(function(transaction) {

              var str="select * from songArtist where name like '%"+keyword+"%'";
                
                transaction.executeSql(str,[], function(transaction, result) {
                    var responses = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        
                        responses.push(result.rows.item(i));
                        
                    }
                    
                    var dt = new Date();
                    var sec = dt.getMilliseconds() - time;
                    
                    deferred.resolve({response: responses, timer: sec}); //at the end of processing the responses
                    
                },function(e){
                    alert("error!");
                });
            });
            
            // Return the promise to the controller
            return deferred.promise;
    }
    
    return self;
});

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

//calculate the time before calling the function in window.onload
var beforeload = (new Date()).getTime();

function getPageLoadTime(){
        //calculate the current time in afterload
        var afterload = (new Date()).getTime();
        // now use the beforeload and afterload to calculate the seconds
        seconds = (afterload-beforeload) / 1000;
        // Place the seconds in the innerHTML to show the results
        $("#load_time").text('Page load time ::  ' + seconds + ' sec(s).');
}

window.onload = getPageLoadTime;
