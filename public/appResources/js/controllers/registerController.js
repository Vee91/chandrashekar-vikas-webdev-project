define(['app', 'registerService'], function (app) {
    app.controller('registerCntrl',
        ['$location', 'RegisterService', function ($location, RegisterService) {
            var vm = this;

            vm.register = register;

            function register(user) {
                RegisterService.findSummonerByName(user.summonerName)
                    .then(function (found) {
                        console.log(found);
                    });
            }

        }]);
    return app;
});