angular.module('SteroidsApplication', [
  'supersonic'
])
.controller('IndexController', ['$scope', '$http', 'supersonic', function($scope, $http, supersonic) {
    
    $scope.data = [];
    
    var responsePromise = $http.get("http://api.openweathermap.org/data/2.5/forecast/daily?q=London");
    var db = window.openDatabase("DB name",1, "Display name",200000);
    responsePromise.success(function(data, status, headers, config) {
       
//          db.transaction(function(transaction){
//        transaction.executeSql("drop table if exists songArtist",[],function(transaction,result){
//            alert("dropped!");
//        })
//    });
        
          db.transaction(function(transaction){
            transaction.executeSql("create table if not exists songArtist(id INTEGER PRIMARY KEY AUTOINCREMENT, name INT)");


            transaction.executeSql("select * from songArtist", [], function(transaction, result) {

                if (result.rows.length>=1) {
                    for (var i = 0; i < result.rows.length; i++) {
                      var row = result.rows.item(i);
                       $scope.$apply(function () {  
                           $scope.data.push(row);
                        });
                    }

                  }else if (result.rows.length<1){ 
                    for(d of data.list){
                        transaction.executeSql("INSERT INTO songArtist (name) values ("+d.dt+")");
                    }

                   getData();

                  }
            });
        });
                 
    });
    responsePromise.error(function(data, status, headers, config) {
        getData();
    });
    
    function getData(){
        db.transaction(function(transaction){
            transaction.executeSql("select * from songArtist", [], function(transaction, result) {
                    for (var i = 0; i < result.rows.length; i++) {
                      var row = result.rows.item(i);
                       $scope.$apply(function () {  
                           $scope.data.push(row);
                        });
                    }
            });
        });  
    }

}]);


