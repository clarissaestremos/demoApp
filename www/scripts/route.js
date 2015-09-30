myApp.config(function($routeProvider) {
    
    $routeProvider
   
    .when('/home', {
        templateUrl: 'pages/index1.html',
        controller: 'IndexController'
    })
       
    .when('/about', {
        templateUrl: 'pages/about.html',
        controller: 'IndexController'
    })
    
    .when('/browse', {
        templateUrl: 'pages/browse.html',
        controller: 'IndexController'
    })
    
    .when('/search', {
        templateUrl: 'pages/search.html',
        controller: 'IndexController'
    })
    
    .when('/contact', {
        templateUrl: 'pages/contact.html',
        controller: 'IndexController'
    })
    
    .when('/native', {
        templateUrl: 'pages/native.html',
        controller: 'IndexController'
    })
    
    .when('/repeat', {
        templateUrl: 'pages/repeat.html',
        controller: 'IndexController'
    })
    
    .when('/favorite', {
        templateUrl: 'pages/favorite.html',
        controller: 'IndexController'
    })
    
    .when('/favorite2', {
        templateUrl: 'pages/favorite2.html',
        controller: 'IndexController'
    })
    
    .when('/favorite3', {
        templateUrl: 'pages/favorite3.html',
        controller: 'IndexController'
    })
    
});