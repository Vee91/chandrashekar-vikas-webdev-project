define(['angular', 'app', 'jqueryui', 'bootstrap', 'tipsService', 'homeService'], function (angular, app) {
    app.controller('adminCntrl',
        ['$location', '$routeParams', 'TipsService', 'HomeService', 'currentUser', function ($location, $routeParams, TipsService, HomeService, currentUser) {
            var vm = this;

            vm.deleteTip = deleteTip;
            vm.editTip = editTip;
            vm.editConfirm = editConfirm;
            vm.hideModal = hideModal;

            function init() {

                HomeService.findAllChampions()
                    .then(function (response) {
                        var champs = response;
                        var keys = [],
                            result = [],
                            k, i;
                        for (k in champs) {
                            if (champs.hasOwnProperty(k)) {
                                keys.push(k);
                            }
                        }
                        keys.sort();

                        len = keys.length;

                        for (i = 0; i < len; i++) {
                            k = keys[i];
                            result.push(champs[k]);
                        }

                        vm.champions = result;
                        vm.champ1 = result[0];
                        vm.champ2 = result[0];
                    });

                TipsService.findAllTips()
                    .then(function (found) {
                        if (found.status) {
                            if (found.status == 400) {
                                vm.error = "You are not authorized to view this page";
                            }
                            else {
                                vm.error = "Something went wrong please try again later";
                            }
                        }
                        else {
                            if (found.length == 0) {
                                vm.notipsfound = true;
                            }
                            else {
                                vm.notipsfound = false;
                                vm.tips = found;
                            }
                        }
                    });
            }

            init();

            function deleteTip(tip) {
                if (confirm("Are you sure you want to delete this tip?")) {
                    TipsService.deleteTip(tip._id, tip)
                        .then(function (found) {
                            if (found.status) {
                                if (found.status == 400) {
                                    vm.error = "You are not authorized to view this page";
                                }
                                else {
                                    vm.error = "Something went wrong please try again later";
                                }
                            }
                            else {
                                if (found.length == 0) {
                                    vm.notipsfound = true;
                                }
                                else {
                                    vm.notipsfound = false;
                                    vm.tips = found;
                                }
                            }
                        });
                }
            }

            function editTip(tip) {
                vm.tip = tip;
                vm.editContent = tip.tips;
                $("#adminEditTipModal").modal('show');
            }

            function editConfirm(tipContent) {
                TipsService.updateTip(vm.tip._id, {
                    tip: tipContent,
                    champ1: vm.champ1.name,
                    champ1Id: vm.champ1.id,
                    champ2: vm.champ2.name,
                    champ2Id: vm.champ2.id
                })
                    .then(function (found) {
                        $("#adminEditTipModal").modal('hide');
                        if (found.status) {
                            if (found.status == 400) {
                                vm.error = "You are not authorized to view this page";
                            }
                            else {
                                vm.error = "Something went wrong please try again later";
                            }
                        }
                        else {
                            if (found.length == 0) {
                                vm.notipsfound = true;
                            }
                            else {
                                vm.notipsfound = false;
                                vm.tips = found;
                            }
                        }
                    });
            }

            function hideModal() {
                $("#adminEditTipModal").modal('hide');
            }

        }]);
    return app;
});