myApp.service('DataService', function($http, $q) {
    var self = this;
    var db = window.openDatabase("DB name",1, "Display name",200000);
    
    self.getData = function(){
        var deferred = $q.defer(),
            url = 'https://glacial-harbor-7075.herokuapp.com/musicArtist/list';
        $http.get(url).success(function(result){
             db.transaction(function(transaction){
                // alert("hello");
                // transaction.executeSql("drop table songArtist",[],function(){alert("dropped");},function(e){alert(e.message);});
                //transaction.executeSql("drop table artistsearch",[],function(){alert("dropped");},function(e){alert(e.message);});
                 
                transaction.executeSql("create table if not exists songArtist(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT)",[],function(){console.log("created");},function(){console.log("error create");});
                transaction.executeSql("select * from songArtist", [], function(transaction,res) {
                    console.log(res.rows.length);
                    if (res.rows.length<1){ //first time to use the app
                    transaction.executeSql("CREATE VIRTUAL TABLE artistsearch USING fts3(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT);");         
                        for(d of result){
                            if(d.id==50000){
                                console.log("break");
                                break;
                            }
                            console.log("insert");
                            transaction.executeSql("INSERT INTO songArtist (name, picture) values ('"+d.name+"', '"+d.picture+"')");
                            transaction.executeSql("INSERT INTO artistsearch (id, name, picture) values ("+d.id+",'"+d.name+"', '"+d.picture+"')");
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
    
    self.search= function(keyword) {
            
        
            var deferred = $q.defer();
            db.transaction(function(transaction) {

              var str="select * from songArtist where name like '%"+keyword+"%'";
                
                transaction.executeSql(str,[], function(transaction, result) {
                    var responses = [];
                    if(result.rows.length<1){console.log("No result");}
                    for (var i = 0; i < result.rows.length; i++) {
                        
                        responses.push(result.rows.item(i));
                        
                    }
            
                    deferred.resolve({response: responses}); //at the end of processing the responses
                    
                },function(e){
                    alert(e.message);
                });
            });
            
            // Return the promise to the controller
            return deferred.promise;
    }
    
    self.searchFTS= function(keyword) {
            
        
            var deferred = $q.defer();
            db.transaction(function(transaction) {

              var str="select * from artistsearch where name match '"+keyword+"'";
                
                transaction.executeSql(str,[], function(transaction, result) {
                    if(result.rows.length<1){console.log("No result");}
                    var responses = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        
                        responses.push(result.rows.item(i));
                        console.log(result.rows.item(i).id);
                        
                    }
                    
                    deferred.resolve({response: responses}); //at the end of processing the responses
                    
                },function(e){
                    alert(e.message);
                });
            });
            
            // Return the promise to the controller
            return deferred.promise;
    }
    
    return self;
});