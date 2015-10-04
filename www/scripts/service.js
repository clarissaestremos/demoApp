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

myApp.service('SearchService', function($http, $q) {
    
    var self = this;

    self.search= function(keyword,db) {   
        
            var deferred = $q.defer();
            db.transaction(function(transaction) {

              var str="select * from songArtist where name like '%"+keyword+"%'";
                
                transaction.executeSql(str,[], function(transaction, result) {
                    var responses = [];
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
    
    self.searchFTS= function(keyword,db) {
            
        
            var deferred = $q.defer();
            db.transaction(function(transaction) {

              var str="select * from artistsearch where name match '"+keyword+"'";
                
                transaction.executeSql(str,[], function(transaction, result) {
                    
                    var responses = [];
                    for (var i = 0; i < result.rows.length; i++) {
                        
                        responses.push(result.rows.item(i));
                        /*console.log(result.rows.item(i).id);*/
                        
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

myApp.service('SaveService', function($http, $q) {
    
    var self = this;

    self.saveData= function(result,db) {   
        
            var deferred = $q.defer();
            db.transaction(function(transaction){
                 console.log("hello");
                /*alert("hello");
                transaction.executeSql("drop table songArtist",[],function(){alert("dropped");},function(e){alert(e.message);});
                transaction.executeSql("drop table artistsearch",[],function(){alert("dropped");},function(e){alert(e.message);});
                */ 
                transaction.executeSql("create table if not exists songArtist(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT)");
                transaction.executeSql("CREATE VIRTUAL TABLE artistsearch USING fts3(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, picture TEXT);");
                transaction.executeSql("select * from songArtist", [], function(transaction,res) {
                    alert(res.rows.length);
                     
                    alert(result.length);
                    angular.forEach(result, function(d,key){
                        if(d.id>70000){
                            transaction.executeSql("INSERT INTO songArtist (id,name, picture) values ("+d.id+",'"+d.name+"', '"+d.picture+"')");
                            transaction.executeSql("INSERT INTO artistsearch (id, name, picture) values ("+d.id+",'"+d.name+"', '"+d.picture+"')");
                        }
                            
                    });
                    
                    deferred.resolve();
                });
            });
            
            // Return the promise to the controller
            return deferred.promise;
    }
    
    return self;

});
myApp.service('BrowseService', function($http, $q) {
    
    var self = this;
    
    self.browse = function(db) {   
        
            var deferred = $q.defer();
            db.transaction(function(transaction) {

              var str="select * from songArtist order by name";
                
                transaction.executeSql(str,[], function(transaction, result) {
                    var responses = [];
                    for (var i = 0; i < result.rows.length; i++) {   
                        responses.push(result.rows.item(i));    
                    }
            
                    deferred.resolve({response: responses}); //at the end of processing the responses
                    
                },function(err){deferred.reject(err);});
                
                /*transaction.executeSql("drop table songArtist",[],function(){alert("dropped");},function(e){alert(e.message);});
                transaction.executeSql("drop table artistsearch",[],function(){alert("dropped");},function(e){alert(e.message);});*/
            });
            
            // Return the promise to the controller
            return deferred.promise;
    }
    
    return self;

});