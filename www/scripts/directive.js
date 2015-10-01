myApp.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
    
});

myApp.directive('testDirective', [function() {
    return function(scope, element, attr) {

        element.on('touchstart', function(event) {
            scope.$apply(function() { 
                scope.$eval(attr.testDirective); 
            });
        });
        
        element.on('touchend', function(event) {
            scope.$apply(function() { 
               scope.$eval(attr.touchEnd); 
            });
        });
    };
}]);