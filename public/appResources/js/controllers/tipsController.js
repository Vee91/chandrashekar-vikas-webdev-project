define(['angular', 'app', 'jqueryui', 'bootstrap', 'tipsService'], function (angular, app) {
    app.controller('tipsCntrl',
        ['$location', '$routeParams', 'TipsService', 'currentUser', function ($location, $routeParams, TipsService, currentUser) {
            var vm = this;
            vm.champ1 = $routeParams.c1;
            vm.champ2 = $routeParams.c2;

            vm.addNewTip = addNewTip;
            vm.createNewTip = createNewTip;
            vm.hideModal = hideModal;
            vm.upVote = upVote;
            vm.downVote = downVote;

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
                vm.error = false;
                $("#addtipsmodal").modal('show');
            }

            function createNewTip(tip) {
                var newTip = {
                    champ1: vm.champ1details.name,
                    champ1Id: vm.champ1details.id,
                    champ2: vm.champ2details.name,
                    champ2Id: vm.champ2details.id,
                    tips: tip,
                    tipBy: currentUser._id,
                    tipByName: currentUser.summonerName,
                    upVotes: 0,
                    downVotes: 0,
                    voteBy: []
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

            function upVote(tip) {
                vm.error = false;
                if (containsObject(currentUser._id, tip.voteBy)) {
                    vm.error = "You have already voted on this tip";
                }
                else {
                    TipsService.upVoteTip(tip, currentUser._id)
                        .then(function (found) {
                            if(found.status){
                                if(found.status == 400){
                                    vm.error = "You have already voted on this tip";
                                }
                                else {
                                    vm.error = "Something went wrong please try again later";
                                }
                            }
                            else {
                                vm.tips = found;
                            }
                        });
                }
            }

            function downVote(tip) {
                console.log(tip);
            }

            function containsObject(obj, list) {
                var i;
                for (i = 0; i < list.length; i++) {
                    if (list[i] === obj) {
                        return true;
                    }
                }

                return false;
            }

        }]);
    return app;
});