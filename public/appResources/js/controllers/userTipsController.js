define(['angular', 'app', 'jqueryui', 'bootstrap', 'tipsService', 'registerService'], function (angular, app) {
    app.controller('userTipsCntrl',
        ['$location', '$routeParams', 'TipsService', 'RegisterService', 'currentUser', function ($location, $routeParams, TipsService, RegisterService, currentUser) {
            var vm = this;

            var userId = $routeParams.userID;

            vm.subscribe = subscribe;
            vm.unsubscribe = unsubscribe;

            function init() {
                TipsService.findAllTipsForUserId(userId)
                    .then(function (found) {
                        if (found.length == 0) {
                            vm.notipsfound = true;
                        }
                        else {
                            vm.notipsfound = false;
                            vm.tips = found;
                            vm.username = vm.tips[0].tipByName;
                        }
                    });
            }

            init();

            function subscribe() {
                RegisterService.subscribe(userId)
                    .then(function (result) {
                        if(result.status){
                            if(result.status == 400){
                                vm.error = "You have already subscribed to this user";
                            }
                            else {
                                vm.error = "Something went wrong please try again later";
                            }
                        }
                        else {
                            $location.url('/ph/profile')
                        }
                    });
            }

            function unsubscribe() {
                RegisterService.unsubscribe(userId)
                    .then(function (result) {
                        if(result.status){
                            if(result.status == 400){
                                vm.error = "You are not subscribed to this user";
                            }
                            else {
                                vm.error = "Something went wrong please try again later";
                            }
                        }
                        else {
                            $location.url('/ph/profile')
                        }
                    });
            }
        }]);
    return app;
});