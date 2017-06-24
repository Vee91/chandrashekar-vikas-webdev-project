define(['app', 'registerService'], function (app) {
    app.controller('registerCntrl',
        ['$location', 'RegisterService', function ($location, RegisterService) {
            var vm = this;

            vm.register = register;

            function register(user) {
                if (!user.username || user.username == undefined || user.username === "") {
                    vm.error = "Please enter Username";
                }
                else if (!user.summonerName || user.summonerName == undefined || user.summonerName === "") {
                    vm.error = "Please enter Summoner Name";
                }
                else if (user.password == undefined || user.password === "") {
                    vm.error = "Please enter Password";
                }
                else if (user.password !== user.confirmpassword) {
                    vm.error = "Please make sure passwords match";
                }
                else {
                    RegisterService.findSummonerByName(user.summonerName)
                        .then(function (found) {
                            if (found.status && found.status.status_code === 404) {
                                vm.error = "Summoner name not found. Please try again";
                            }
                            else {
                                RegisterService.createUser(user)
                                    .then(function (response) {
                                    });
                            }
                        });
                }
            }

        }]);
    return app;
});