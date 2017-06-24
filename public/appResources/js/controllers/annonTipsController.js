define(['angular', 'app', 'jqueryui', 'bootstrap', 'tipsService'], function (angular, app) {
    app.controller('annonTipsCntrl',
        ['$location', '$routeParams', 'TipsService', function ($location, $routeParams, TipsService) {
            var vm = this;
            vm.champ1 = $routeParams.c1;
            vm.champ2 = $routeParams.c2;

            function init() {
                TipsService.findChampById(vm.champ1)
                    .then(function (response) {
                        vm.champ1details = response;
                    });
                TipsService.findChampById(vm.champ2)
                    .then(function (response) {
                        vm.champ2details = response;
                    });
                TipsService.searchMatchup(vm.champ1, vm.champ2)
                    .then(function (found) {
                        if (found.length == 0) {
                            vm.notipsfound = true;
                        }
                        else {
                            vm.notipsfound = false;
                            vm.tips = found;
                        }
                    });
            }

            init();


        }]);
    return app;
});