myApp.config(function($routeProvider) {
    
    $routeProvider
   
    .when('/home', {
        templateUrl: 'pages/index1.html'
    })
       
    .when('/about', {
        templateUrl: 'pages/about.html'
    })
    
    .when('/browse', {
        templateUrl: 'pages/browse.html'
    })
    
    .when('/search', {
        templateUrl: 'pages/search.html'
    })
    
    .when('/setting', {
        templateUrl: 'pages/setting.html'
    })
    
    .when('/native', {
        templateUrl: 'pages/native.html'
    })
    
    .when('/repeat', {
        templateUrl: 'pages/repeat.html'
    })
    
    .when('/favorite', {
        templateUrl: 'pages/favorite.html'
    })
    
    .when('/favorite2', {
        templateUrl: 'pages/favorite2.html'
    })
    
    .when('/favorite3', {
        templateUrl: 'pages/favorite3.html'
    })
    
/*    .when('/about', {
        templateUrl: 'pages/about.html',
        controller: 'IndexController'
    })*/
    
});