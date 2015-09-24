var myApp = angular.module('SteroidsApplication', [
  'supersonic', 'ngRoute'
]);

window.location.hash = "home";

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
    
});

myApp.service('DataService', function($http, $q) {
    var self = this;
  
    self.getData = function(){
        var deferred = $q.defer(),
            url = 'https://glacial-harbor-7075.herokuapp.com/musicArtist/list';
        $http.get(url).success(function(result){
            deferred.resolve(result);
        }).error(function(err){
            deferred.reject(err);     
        });
        return deferred.promise;
    }
  return self;
});

myApp.controller('IndexController', ['supersonic', 'DataService', '$scope', function(supersonic, DataService, $scope) {

    var db = window.openDatabase("DB name",1, "Display name",200000);

    var list = [];
    $scope.listOfArtist1 = [];
    $scope.listOfArtist2 = [];
    $scope.numData1 = 0;
    $scope.numData2 = 0;
 
     DataService.getData().then(function(data) {
            db.transaction(function(transaction){
                
                transaction.executeSql("create table if not exists songArtist(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT)");
                transaction.executeSql("select * from songArtist", [], function(transaction, result) {

                    
                   if (result.rows.length<1){ //first time to use the app
                        for(d of data){
                            transaction.executeSql("INSERT INTO songArtist (name, picture) values ('"+d.name+"', '"+d.picture+"')");
                        }
                      }
                        
                });
            });
            
        }, function(reason) {
            alert("No internet connection.");
        });
    
    $scope.showData = function(){
        var dt = new Date();
        var timer = dt.getMilliseconds();
        $scope.timer = 0;
        $scope.listOfArtist1 = dataQueries(timer);
        $scope.timer = timer;
        $scope.numData1 = $scope.listOfArtist1.length;
    }
    
    /*document.getElementById("btnClick").addEventListener("click", function(){
        var dt = new Date();
        var timer2 = dt.getMilliseconds();
        $scope.timer2 = 0;
        $scope.listOfArtist2 = dataQueries(timer2);
        $scope.timer2 = timer2;
        $scope.numData2 = $scope.listOfArtist2.length;
    });*/
    
    
    function dataQueries(timer){
//
//    $scope.listArtist = [];
//    $scope.search_input="";
//

        DataService.getData().then(function(data) {
//            db.transaction(function(transaction){
//                        $scope.$apply(function () {  
//                            $scope.listArtist = data;
//                        });
//                        
//                        var nativeJavascriptListArtist = data;
//                        var ul = document.getElementById("nativeAddArtist");
//                        var li = document.createElement("li");
//                        
//                      for (var p in nativeJavascriptListArtist) {
//                        if( nativeJavascriptListArtist.hasOwnProperty(p) ) {
//                          li.appendChild(document.createTextNode(nativeJavascriptListArtist[p].name));
//                          ul.appendChild(li);
//                        } 
//                      } 
//                        
            list = data;
        }, function(reason) {
            db.transaction(function(transaction){
                transaction.executeSql("select * from songArtist", [], function(transaction, result) {
                      
                        for (var i = 0; i < result.rows.length; i++) {
                          var row = result.rows.item(i);
                           $scope.$apply(function () {  
                               list.push(row);
                            });
                        }
                });
            });  
        });

        
        var dt2 = new Date();
        timer = (dt2.getMilliseconds() - timer)/1000;
        return list;
    }

//          db.transaction(function(transaction){
//        transaction.executeSql("drop table if exists songArtist",[],function(transaction,result){
//            alert("dropped!");
//        })
//    });

          
}]);
