angular.module('SteroidsApplication', [
  'supersonic'
])
.controller('IndexController', ['$scope', '$http', 'supersonic', function($scope, $http, supersonic) {
    
    $scope.data = [];
    for(var i = 1; i<=5; i++){
        $.ajax({
            dataType: "jsonp",
            url :"http://api.deezer.com/2.0/artist/"+i+"?output=jsonp",
            data : {},
            jsonp : 'callback',
            success : function(data) {
               
                 $scope.$apply(function () {
                    $scope.data.push(data);
                });
            }
          });
        
    }

}]);
