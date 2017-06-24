define(['angular', 'app', 'jqueryui', 'bootstrap', 'tipsService'], function (angular, app) {
    app.controller('userTipsCntrl',
        ['$location', '$routeParams', 'TipsService', 'currentUser', function ($location, $routeParams, TipsService, currentUser) {
            var vm = this;

            var userId = $routeParams.userID;

            function init() {
                TipsService.findAllTipsForUserId(userId)
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