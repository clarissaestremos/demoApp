<<<<<<< HEAD
=======

>>>>>>> b93bc9e89bca64118ee2f71255fb09a9273d9718
myApp.service('DataService', function($http, $q) {
    var self = this;
    var db = window.openDatabase("DB name",1, "Display name",200000);
    
    self.getData = function(){
        var deferred = $q.defer(),
            url = 'https://glacial-harbor-7075.herokuapp.com/musicArtist/list';
        $http.get(url).success(function(result){
             db.transaction(function(transaction){
                /*alert("hello");
                transaction.executeSql("drop table songArtist",[],function(){alert("dropped");},function(e){alert(e.message);});
                transaction.executeSql("drop table artistsearch",[],function(){alert("dropped");},function(e){alert(e.message);});*/
                 
                transaction.executeSql("create table if not exists songArtist(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT)",[],function(){console.log("created");},function(){console.log("error create");});
                transaction.executeSql("select * from songArtist", [], function(transaction,res) {
                    alert(res.rows.length);
                    if (res.rows.length<1){ //first time to use the app
                    transaction.executeSql("CREATE VIRTUAL TABLE artistsearch USING fts3(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT);");         
                        for(d of result){
                            if(d.id==50000){
                                console.log("break");
                                break;
                            }
                            console.log("insert");
                            transaction.executeSql("INSERT INTO songArtist (name, picture) values ('"+d.name+"', '"+d.picture+"')");
                            transaction.executeSql("INSERT INTO artistsearch (name, picture) values ('"+d.name+"', '"+d.picture+"')");
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
    
<<<<<<< HEAD
    self.search= function(keyword, time) {
=======
    self.search= function(keyword, timeMS, timeS) {
>>>>>>> b93bc9e89bca64118ee2f71255fb09a9273d9718
            
        
            var deferred = $q.defer();
            db.transaction(function(transaction) {

              var str="select * from songArtist where name like '%"+keyword+"%'";
                
                transaction.executeSql(str,[], function(transaction, result) {
                    var responses = [];
<<<<<<< HEAD
                    if(result.rows.length<1){console.log("No result");}
=======
>>>>>>> b93bc9e89bca64118ee2f71255fb09a9273d9718
                    for (var i = 0; i < result.rows.length; i++) {
                        
                        responses.push(result.rows.item(i));
                        
                    }
                    
<<<<<<< HEAD
                    deferred.resolve({response: responses}); //at the end of processing the responses
                    
                },function(e){
                    alert(e.message);
                });
            });
            
            // Return the promise to the controller
            return deferred.promise;
    }
    
    self.searchFTS= function(keyword, time) {
            
        
            var deferred = $q.defer();
            db.transaction(function(transaction) {

              var str="select * from artistsearch where name match '"+keyword+"'";
                
                transaction.executeSql(str,[], function(transaction, result) {
                    if(result.rows.length<1){console.log("No result");}
                    var responses = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        
                        responses.push(result.rows.item(i));
                        
                    }
                    
                    deferred.resolve({response: responses}); //at the end of processing the responses
                    
                },function(e){
                    alert(e.message);
=======
                    var dt = new Date();
                    var ms = dt.getMilliseconds()/1000;
                    var s = dt.getSeconds();
                    var totalSec1 = timeMS + timeS;
                    var totalSec2 = ms + s;
                    var sec = totalSec2 - totalSec1;
                    
                    deferred.resolve({response: responses, timer: sec}); //at the end of processing the responses
                    
                },function(e){
                    alert("error!");
>>>>>>> b93bc9e89bca64118ee2f71255fb09a9273d9718
                });
            });
            
            // Return the promise to the controller
            return deferred.promise;
    }
    
    return self;
});