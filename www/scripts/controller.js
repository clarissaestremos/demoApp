
myApp.controller('IndexController', ['supersonic', 'DataService', '$scope','SearchService','SaveService', 'BrowseService', function(supersonic, DataService, $scope, SearchService,SaveService, BrowseService) {
    
    
    var db = window.openDatabase("DB name",1, "Display name",200000);
    
    var startRep;
    
    $scope.navbarTitle = "Home";
    
    $scope.changeToHome = function() {
        $scope.navbarTitle = "Home";  
    };
    
    $scope.changeToAbout = function() {
        $scope.navbarTitle = "About";  
    };
    $scope.changeToBrowse = function() {
        $scope.navbarTitle = "Browse";  
    };
    
    $scope.changeToSearch = function() {
        $scope.navbarTitle = "Search";  
    };
    $scope.changeToSetting = function() {
        $scope.navbarTitle = "Setting";  
    };
    
    $scope.changeToFavorite = function() {
        $scope.navbarTitle = "My Favorites";  
    };
    
    var list = [];
    $scope.browseArtist = [];
    $scope.listArtist1 = [];
    $scope.listArtist2 = [];
    $scope.numData1 = 0;
    $scope.numData2 = 0;
    $scope.searchClicked = false;
    $scope.searchFTSClicked = false;
    $scope.pages1=0;
    $scope.pages2=0;
    $scope.showButton=false;
    $scope.showButtonFTS=false;
    $scope.search_input="";
    $scope.pageSize = 100;
    $scope.maxSize = 3;

    $scope.$watch('online', function(newStatus) {});
    
    $scope.loader = {
      loading: true
    };
    
    $scope.searchLoader = {
      loading: false
    };
    
    $scope.searchFTSLoader = {
      loading: false
    };
    
    DataService.getData().then(function(data) {


            $scope.browseArtist = data;
            SaveService.saveData(data);
            $scope.loader.loading = false;
            /*var nativeJavascriptListArtist = data;
            var ul = document.getElementById("nativeAddArtist");

            for (var p in nativeJavascriptListArtist) {
                if( nativeJavascriptListArtist.hasOwnProperty(p) ) {
                  ul.innerHTML += "<a class='item item-thumbnail-left'><img src='"+nativeJavascriptListArtist[p].picture+"'/><h2>"+nativeJavascriptListArtist[p].name+"</h2></a>";
                } 
              }*/ 
                        
        }, function(reason) {
            alert("There something wrong in the server or the connection.");
        });  
    

    $scope.search = function(search_input) {
        $scope.searchLoader.loading = true;
            SearchService.search(search_input).then(function(d) {
                $scope.searchLoader.loading = false;

                $scope.listOfArtist = d.response;
                var length = $scope.listOfArtist.length;
                $scope.pages1 = 10;
                $scope.showButton=false;
                if(length<$scope.pages1)
                    $scope.pages1=length;
                $scope.searchClicked = true;
                
                $scope.listOfArtist1= $scope.listOfArtist.slice(0,$scope.pages1);
                $scope.numData1 = length;
                $scope.numDataMore = length-$scope.pages1;
                if($scope.numDataMore>0)
                    $scope.showButton=true;
                
            },function(e){alert(e.message);});
        }
    

    $scope.browseNative = function() {
        
        BrowseService.browse().then(function(data) {

            var nativeJavascriptListArtist = data.response;
            var ul = document.getElementById("nativeAddArtist");
            var start = new Date().getTime();
            
            for (var p in nativeJavascriptListArtist) {
                if( nativeJavascriptListArtist.hasOwnProperty(p) ) {
                  ul.innerHTML += "<li><a class='item item-thumbnail-left'><img src='"+nativeJavascriptListArtist[p].picture+"'/><h2>"+nativeJavascriptListArtist[p].name+"</h2></a><li>";
                } 
            } 
            
            var end = new Date().getTime();
            var time = end - start;
            alert('Execution time: ' + time + ' milliseconds');
            
        }, function(reason) {
            alert("There something wrong in the server or the connection.");
        }); 

    };
    
    $scope.browseRepeat = function() {
            BrowseService.browse().then(function(data) {
                
            startRep = new Date().getTime();
            $scope.browseArtist = data.response;
            
        }, function(reason) {
            alert("There something wrong in the server or the connection.");
        }); 
    };

    
    $scope.searchPage = function() {
        var view = new steroids.views.WebView("index.html#/search");
        steroids.drawers.hide({center: view});
        /*console.log("clicked");
        console.log($location.path());
        $location.path('/search');
        $location.replace();
        
        console.log($location.path());*/
    }
    
    $scope.searchFTS = function(search_input){
        $scope.searchFTSLoader.loading = true;
        SearchService.searchFTS(search_input).then(function(d) {
                $scope.searchFTSLoader.loading = false;
                $scope.listOfArtistFTS = d.response;
                var length = $scope.listOfArtistFTS.length;
                $scope.showButtonFTS=false;
                $scope.pages2 = 10;
                if(length<$scope.pages2)
                    $scope.pages2=length;
                $scope.searchFTSClicked = true;
                $scope.listOfArtist2= $scope.listOfArtistFTS.slice(0,$scope.pages2);
                $scope.numData2 = length;
                $scope.numDataMore2 = length-$scope.pages2;
                if($scope.numDataMore2>0)
                    $scope.showButtonFTS=true;
                
            },function(e){alert(e.message);});
    }

    
    $scope.moreItem = function(){
        
        var pageCounter = $scope.listOfArtist.length-$scope.pages1;
        if(pageCounter>10){
            $scope.pages1=$scope.pages1+10;
            $scope.numDataMore=$scope.listOfArtist.length-$scope.pages1;
        }
        else{
            $scope.pages1=$scope.listOfArtist.length;
            $scope.showButton=false;    
            }
        $scope.listOfArtist1= $scope.listOfArtist.slice(0,$scope.pages1);
        
    }
    
    $scope.moreItem2 = function(){
        
        var pageCounter = $scope.listOfArtistFTS.length-$scope.pages2;
        if(pageCounter>10){
            $scope.pages2=$scope.pages2+10;
            $scope.numDataMore2=$scope.listOfArtistFTS.length-$scope.pages2;
        }
        else{
            $scope.pages2=$scope.listOfArtistFTS.length;
            $scope.showButtonFTS=false;    
            }
        $scope.listOfArtist2= $scope.listOfArtistFTS.slice(0,$scope.pages2);
        
    }
    
    var onoff = 0;
    
    $(".dlBtn").click(function(){
        if(onoff == 0) {
            $(this).html("ON");
            onoff = 1;
            $("#hideProgress").css( "display", "block" );
            increaseProgress();
        }
        else if(onoff == 1) {
            $(this).html("OFF");
            $("#hideProgress").css( "display", "none" );
            onoff = 0;
        }
    });
    
    var varCounter = 0;


    var increaseBar = function(){
     if(varCounter <= 5) {
          ++varCounter;
          $("#p-bar").css( "width", "+=52%" );
     } 
     else if(varCounter == 6){
          clearInterval(increaseProgress);
          $("#success-loaded").css( "display", "block" );
          removeSuccessMessage();    
          ++varCounter;
     }
    };
    
    function removeSuccessMessage() {
        setTimeout(function(){ 
            $("#success-loaded").css( "display", "none" );
            removeProgress();
        }, 3000);
    };
    
    function removeProgress() {
        setTimeout(function(){ 
            $("#hideProgress").css( "display", "none" );
        }, 2000);
    };
    
    function increaseProgress() {
        setInterval(increaseBar, 1000);          
    };
    
    $scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
        var end = new Date().getTime();
        var time = end - startRep;
        alert('Execution time: ' + time + ' milliseconds');
    });
    
    $scope.data1 = "Off"; 
    $scope.sample = function(){
        if($scope.data1 == "Off"){
            $scope.data1 = "On"; 
        }else{
            $scope.data1 = "Off";
        }
          
        
    }
    
    $scope.touchStart = function() {
        $scope.timer = Date.now();
    }

    $scope.touchEnd = function() {
        $scope.timer1 = Date.now() - $scope.timer;
    }
    
    
   
}]);
