
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
    
    self.search= function(keyword, timeMS, timeS) {
            
        
            var deferred = $q.defer();
            db.transaction(function(transaction) {

              var str="select * from songArtist where name like '%"+keyword+"%'";
                
                transaction.executeSql(str,[], function(transaction, result) {
                    var responses = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        
                        responses.push(result.rows.item(i));
                        
                    }
                    
                    var dt = new Date();
                    var ms = dt.getMilliseconds()/1000;
                    var s = dt.getSeconds();
                    var totalSec1 = timeMS + timeS;
                    var totalSec2 = ms + s;
                    var sec = totalSec2 - totalSec1;
                    
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