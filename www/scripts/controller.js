
myApp.controller('IndexController', ['supersonic', 'DataService', '$scope','SearchService','SaveService', 'BrowseService', function(supersonic, DataService, $scope, SearchService,SaveService, BrowseService) {
    
    
    var db = window.openDatabase("DB name",1, "Display name",200000);
    var startRep;
    
    $scope.navbarTitle = "Home";
    $scope.changeTitle = function(title){
        $scope.navbarTitle = title;
    }
    
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
    $scope.allData = [];
    

    $scope.$watch('online', function(newStatus) {});
    
    $scope.loader = {
        loading: true,
        notLoading: false
    };
    
    $scope.searchLoader = {
      loading: false
    };
    
    $scope.searchFTSLoader = {
      loading: false
    };
    
    BrowseService.browse(db).then(function(data) {
        console.log("successBrowse");
        $scope.allData = data.response;
        $scope.loader.loading = false;
        $scope.loader.notLoading = true;
    },function(){
        
        console.log("error");
        
        DataService.getData().then(function(data) {
                
                $scope.allData = data;
                console.log("successGet");
            
            SaveService.saveData(data,db).then(function(){
                console.log("successSave");
                $scope.loader.loading = false;
                $scope.loader.notLoading = true;
            });
                        
        }, function(reason) {
            alert("There something wrong in the server or the connection.");
        });
    
    });
    

    $scope.search = function(search_input) {
        $scope.searchLoader.loading = true;
            SearchService.search(search_input,db).then(function(d) {
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
                
            });
        }
    
    $scope.browseNative = function() {
        
            console.log("browseNative");
            var nativeJavascriptListArtist = $scope.allData.slice(0,100);
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

    }
    
    $scope.browseRepeat = function() {
            
        startRep = new Date().getTime();
        $scope.browseArtist = $scope.allData.slice(0,100);
        console.log($scope.browseArtist);
            
    }
    
    $scope.resetBrowseRepeat = function() {
       $scope.browseArtist = [];    
    }
    
    $scope.searchFTS = function(search_input){
        $scope.searchFTSLoader.loading = true;
        SearchService.searchFTS(search_input,db).then(function(d) {
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
   

     $("#btnClick").on('click',function(e){
         document.getElementById("data").innerHTML = "Data2" ;
    });
    
    $(".toggleMenu").click(function() {
                   $(".ham_menu").toggleClass("menuClosed");
                });
}]);

   
