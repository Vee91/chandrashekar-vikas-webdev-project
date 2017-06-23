define(['app', 'tipsService'], function (app) {
    app.controller('tipsCntrl',
        ['$location', '$routeParams', 'TipsService', function ($location, $routeParams, TipsService) {
            var vm = this;
            vm.champ1 = $routeParams.c1;
            vm.champ2 = $routeParams.c2;


            function init() {
                TipsService.searchMatchup(vm.champ1, vm.champ2)
                    .then(function (found) {
                        if(found.length == 0){
                            vm.notipsfound = true;
                        }
                        else {
                            vm.notipsfound = false;
                        }
                    });
            }
            init();

        }]);
    return app;
});