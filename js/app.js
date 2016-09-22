(function () {
    'use strict';
    angular.module('app4com', ['ngSanitize'])
        .directive('resize', resize)
        .service('chartService', chartService)
        .service('carouselService', carouselService)
        .controller('mainCtrl', mainCtrl);
})();