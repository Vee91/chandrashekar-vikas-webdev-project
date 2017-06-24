define(['angular', 'app', 'jqueryui', 'bootstrap', 'tipsService'], function (angular, app) {
    app.controller('tipsCntrl',
        ['$location', '$routeParams', 'TipsService', 'currentUser', function ($location, $routeParams, TipsService, currentUser) {
            var vm = this;
            vm.champ1 = $routeParams.c1;
            vm.champ2 = $routeParams.c2;

            vm.addNewTip = addNewTip;
            vm.createNewTip = createNewTip;
            vm.hideModal = hideModal;




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

            function addNewTip() {
                $("#addtipsmodal").modal('show');
            }

            function createNewTip(tip) {
                var newTip = {
                    champ1: champ1details.name,
                    champ1Id: champ1details.id,
                    champ2: champ2details.name,
                    champ2Id: champ2details.id,
                    tips: tip,
                    tipBy: currentUser._id,
                    tipByName: currentUser.summonerName,
                    upVotes: 0,
                    downVotes: 0,
                };
                TipsService.addTip(newTip).then(function (found) {
                    if (found.length == 0) {
                        vm.notipsfound = true;
                    }
                    else {
                        vm.notipsfound = false;
                        vm.tips = found;
                    }
                    $("#addtipsmodal").modal('hide');
                });

            }

            function hideModal() {
                $("#addtipsmodal").modal('hide');
            }

        }]);
    return app;
});