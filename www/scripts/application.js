<<<<<<< HEAD
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
=======
var myApp = angular.module('SteroidsApplication',['supersonic']);

>>>>>>> e21d315e31d524a4578907a788317d8fa87a8fbe

myApp.service('DataService', function($http) {
  var promise;
  var myService = {
    getData: function() {
      if ( !promise ) {
        // $http returns a promise, which has a then function, which also returns a promise
        promise = $http.get('https://glacial-harbor-7075.herokuapp.com/musicArtist/list').then(function (response) {
          // The then function here is an opportunity to modify the response
          console.log(response);
          // The return value gets picked up by the then in the controller.
          return response.data;
        });
      }
      // Return the promise to the controller
      return promise;
    }
  };
  return myService;
});

myApp.controller('IndexController', ['supersonic', 'DataService', '$scope',function(supersonic, DataService,$scope) {

    var db = window.openDatabase("DB name",1, "Display name",200000);
    $scope.listArtist = [];
<<<<<<< HEAD

=======
>>>>>>> e21d315e31d524a4578907a788317d8fa87a8fbe
//    $scope.showData = function(){
        DataService.getData().then(function(data) {
           
            db.transaction(function(transaction){
<<<<<<< HEAD
                
                transaction.executeSql("create table if not exists songArtist(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT)");

                transaction.executeSql("select * from songArtist", [], function(transaction, result) {

                    
                    if (result.rows.length>=1) {           
                        $scope.$apply(function () {  
                        $scope.listArtist = data;
                    });
                        
                        var nativeJavascriptListArtist = data;
                        var ul = document.getElementById("nativeAddArtist");
                        var li = document.createElement("li");
                        var br = document.createElement("br");
//                        
//                        for (var key in nativeJavascriptListArtist) {
//                           if (nativeJavascriptListArtist.hasOwnProperty(key)) {
//                               var obj = nativeJavascriptListArtist[key];
//                                for (var prop in obj) {
//                                  // important check that this is objects own property 
//                                  // not from prototype prop inherited
//                                  if(obj.hasOwnProperty(prop)){
//                                    li.appendChild(document.createTextNode(obj[prop]));
//                                    ul.appendChild(li);
//                                  }
//                               }
//                            }
//                        }
                        
                      for (var p in nativeJavascriptListArtist) {
                        if( nativeJavascriptListArtist.hasOwnProperty(p) ) {

                          result += nativeJavascriptListArtist[p].name;
                            
                          li.appendChild(document.createTextNode(nativeJavascriptListArtist[p].name));
                          ul.appendChild(li);
                          ul.appendChild(br);
                        } 
                      } 
                        
=======
                transaction.executeSql("create table if not exists songArtist(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT)");


                transaction.executeSql("select * from songArtist", [], function(transaction, result) {

                    if (result.rows.length>=1) {
                        $scope.listArtist = data;
>>>>>>> e21d315e31d524a4578907a788317d8fa87a8fbe
                    }else if (result.rows.length<1){ //first time to use the app
                        for(d of data){
                            transaction.executeSql("INSERT INTO songArtist (name, picture) values ('"+d.name+"', '"+d.picture+"')");
                        }
<<<<<<< HEAD
                       
                        $scope.$apply(function () {  
                            $scope.listArtist = data;
                        });  
=======
                          
                       select();
>>>>>>> e21d315e31d524a4578907a788317d8fa87a8fbe

                      }
                });
            });

        }, function(reason) {
            select();
        });
    
    function select(){
        db.transaction(function(transaction){
            transaction.executeSql("select * from songArtist", [], function(transaction, result) {
                    for (var i = 0; i < result.rows.length; i++) {
                      var row = result.rows.item(i);
                       $scope.$apply(function () {  
                           $scope.listArtist.push(row);
                        });
                    }
            });
        });  
    }
        
//    }
//    
//    var responsePromise = $http.get("https://glacial-harbor-7075.herokuapp.com/musicArtist/list");
    //alert(responsePromise.);
    

//    responsePromise.then(function(response) {
//       alert(response);
//          db.transaction(function(transaction){
//        transaction.executeSql("drop table if exists songArtist",[],function(transaction,result){
//            alert("dropped!");
//        })
//    });
        
          
<<<<<<< HEAD
}]);
=======
}]);



>>>>>>> e21d315e31d524a4578907a788317d8fa87a8fbe
