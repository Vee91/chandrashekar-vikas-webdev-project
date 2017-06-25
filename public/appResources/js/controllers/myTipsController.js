define(['angular', 'app', 'jqueryui', 'bootstrap', 'tipsService'], function (angular, app) {
    app.controller('myTipsCntrl',
        ['$location', '$routeParams', 'TipsService', 'currentUser', function ($location, $routeParams, TipsService, currentUser) {
            var vm = this;

            vm.deleteTip = deleteTip;
            vm.deleteConfirm = deleteConfirm;
            vm.hideModal = hideModal;
            vm.editTip = editTip;
            vm.editConfirm = editConfirm;

            function init() {
                TipsService.findAllTipsForUser(currentUser._id)
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

            function deleteTip(tip) {
                vm.tip = tip;
                $("#deleteTipModal").modal('show');
            }

            function deleteConfirm() {
                TipsService.deleteTip(vm.tip._id)
                    .then(function (found) {
                        $("#deleteTipModal").modal('hide');
                        if (found.length == 0) {
                            vm.notipsfound = true;
                        }
                        else {
                            vm.notipsfound = false;
                            vm.tips = found;
                        }
                    });
            }

            function editTip(tip) {
                vm.tip = tip;
                vm.editContent = tip.tips;
                $("#editTipModal").modal('show');
            }

            function editConfirm(tipContent) {
                TipsService.updateTip(vm.tip._id, tipContent)
                    .then(function (found) {
                        $("#editTipModal").modal('hide');
                        if (found.length == 0) {
                            vm.notipsfound = true;
                        }
                        else {
                            vm.notipsfound = false;
                            vm.tips = found;
                        }
                    });
            }

            function hideModal() {
                $("#editTipModal").modal('hide');
                $("#deleteTipModal").modal('hide');
            }

        }]);
    return app;
});