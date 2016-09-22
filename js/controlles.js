mainCtrl.$inject = ['$scope', '$window', 'chartService', 'carouselService', '$timeout'];

function mainCtrl($scope, $window, chartService, carouselService, $timeout) {
    var vm = this;
    var delayForResizing;
    $scope.$on('ww', function (event, arg) {
        $timeout.cancel(delayForResizing);
        delayForResizing = $timeout(function () {
            chartService.buildChart(arg.size);
        },500);
    });

    vm.amount = chartService.amount;
    chartService.buildChart($window.innerWidth);
    vm.carouselData = carouselService.data;
    vm.current = 0;
    vm.active = false;
    vm.currentData = vm.carouselData[vm.current];
    vm.carouselAction = function (dir) {
        if(dir === 'prev') {
            vm.active = true;
            $timeout(function () {
                vm.current = (vm.current === 0) ? vm.carouselData.length - 1 : vm.current - 1;
                vm.currentData = vm.carouselData[vm.current];
                vm.active = false;
            }, 300);
        } else {
            vm.active = true;
            $timeout(function () {
                vm.current = (vm.current === vm.carouselData.length - 1) ? 0 : vm.current + 1;
                vm.currentData = vm.carouselData[vm.current];
                vm.active = false;
            }, 300);
        }
    }
}