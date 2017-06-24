define(['angular', 'app', 'jqueryui', 'bootstrap', 'tipsService'], function (angular, app) {
    app.controller('tipsCntrl',
        ['$location', '$routeParams', 'TipsService', 'currentUser', function ($location, $routeParams, TipsService, currentUser) {
            var vm = this;
            vm.champ1 = $routeParams.c1;
            vm.champ2 = $routeParams.c2;

            vm.addNewTip = addNewTip;
            vm.createNewTip = createNewTip;

            function init() {
                TipsService.searchMatchup(vm.champ1, vm.champ2)
                    .then(function (found) {
                        if (found.length == 0) {
                            vm.notipsfound = true;
                        }
                        else {
                            vm.notipsfound = false;
                        }
                    });
            }

            init();

            function addNewTip() {
                $("#addtipsmodal").modal('show');
            }

            function createNewTip() {
                console.log(vm.tip);
                $("#addtipsmodal").modal('hide');
            }

        }]);
    return app;
});