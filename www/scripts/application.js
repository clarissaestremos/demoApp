var myApp = angular.module('SteroidsApplication', [
  'supersonic', 'ngRoute','ui.router', 'ui.bootstrap'
]);

window.location.hash = "home";

myApp.run(function($window, $rootScope) {
      $rootScope.online = navigator.onLine;
      $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          $rootScope.online = false;
        });
      }, false);
      $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
          $rootScope.online = true;
        });
      }, false);
});

//calculate the time before calling the function in window.onload
var beforeload = (new Date()).getTime();

function getPageLoadTime(){
        //calculate the current time in afterload
        var afterload = (new Date()).getTime();
        // now use the beforeload and afterload to calculate the seconds
        seconds = (afterload-beforeload) / 1000;
        // Place the seconds in the innerHTML to show the results
        $("#load_time").text('Page load time :  ' + seconds + ' sec(s).');
}

window.onload = getPageLoadTime;

myApp.filter('startFrom', function(){
    return function(data, start){
        return data.slice(start);   
    }
});



