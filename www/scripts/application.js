var myApp = angular.module('SteroidsApplication',['supersonic']);


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
 
    
    $scope.showData = function(){
        var dt = new Date();
        var timer = dt.getMilliseconds();
        $scope.timer = 0;
        $scope.listOfArtist1 = dataQueries(timer);
        $scope.timer = timer;
        $scope.numData1 = $scope.listOfArtist1.length;
    }
    
    document.getElementById("btnClick").addEventListener("click", function(){
        var dt = new Date();
        var timer2 = dt.getMilliseconds();
        $scope.timer2 = 0;
        $scope.listOfArtist2 = dataQueries(timer2);
        $scope.timer2 = timer2;
        $scope.numData2 = $scope.listOfArtist2.length;
    });
    
    
    function dataQueries(timer){
        DataService.getData().then(function(data) {
            db.transaction(function(transaction){
                transaction.executeSql("create table if not exists songArtist(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT)");
                transaction.executeSql("select * from songArtist", [], function(transaction, result) {

                    if (result.rows.length>=1) {
                        list = data;
                    }else if (result.rows.length<1){ //first time to use the app
                        for(d of data){
                            transaction.executeSql("INSERT INTO songArtist (name, picture) values ('"+d.name+"', '"+d.picture+"')");
                        }
                          
                        list = data;

                      }
                        
                });
            });
            
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




