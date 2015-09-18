angular.module('SteroidsApplication', [
  'supersonic'
])
.controller('IndexController', ['$scope', '$http', 'supersonic', function($scope, $http, supersonic) {
    
    $scope.data = [];
    var db = window.openDatabase("DB name",1, "Display name",200000);
//    var flag = 0;
//    db.transaction(function(transaction){
//        transaction.executeSql("drop table if exists songArtist",[],function(transaction,result){
//            console.log("dropped!");
//        })
//    });
    
    db.transaction(function(transaction){
        transaction.executeSql("create table if not exists songArtist(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT)",[],function(transaction,result){
            console.log("table created!");
        })
    });
    
    for(var i = 1; i<=10; i++){
        $.ajax({
            dataType: "jsonp",
            url :"http://api.deezer.com/2.0/artist/"+i+"?output=jsonp",
            data : {},
            jsonp : 'callback',
            success : function(data) {
               
                 $scope.$apply(function () {
                    
                   db.transaction(function(transaction,result){
                        transaction.executeSql("INSERT INTO songArtist (name, picture) values ('"+data.name+"','"+data.picture+"')",[],function(transaction, result){
                        }, function(transaction, error){
                         
                        });
                    });
                   
                });
            },
            error: function(e){
                alert("Cannot connect to the server.");
            }
          });
        
    }
    
    
    var selectQuery = "select * from songArtist"; 
        db.transaction(function(transaction) {
            transaction.executeSql(""+selectQuery, [], function(transaction, result) {
                if (result != null) {
                    for (var i = 0; i < result.rows.length; i++) {
                      var row = result.rows.item(i);
                      $scope.data.push(row);
                    }
                    
                  }else{
                      alert("No data retrieved. Check your connection.");
                  }
            }, function(e) {
              alert("ERROR Select Query: " + e.message);
            });
        });
    

}]);
