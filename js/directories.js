resize.$inject = ['$window'];

function resize($window) {
    return {
        link: link,
        restrict: 'A'
    };

    function link(scope) {
        scope.width = $window.innerWidth;
        angular.element($window).bind('resize', function () {
            scope.width = $window.innerWidth;
            scope.$broadcast('ww', { size : scope.width});
            scope.$digest();
        });

    }
}
