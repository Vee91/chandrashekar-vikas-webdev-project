define(['app', 'registerService'], function (app) {
    app.controller('registerCntrl',
        ['$location', 'RegisterService', function ($location, RegisterService) {
            var vm = this;

            vm.register = register;
            vm.roles = [
                {name: 'TRAINEE'},
                {name: 'COACH'},
                {name: 'ADMIN'}
            ];
            vm.role = vm.roles[0];
            function register(user) {
                if (!user.summonerName || user.summonerName == undefined || user.summonerName === "") {
                    vm.error = "Please enter Summoner Name";
                }
                else if (user.password == undefined || user.password === "") {
                    vm.error = "Please enter Password";
                }
                else if (user.password !== user.confirmpassword) {
                    vm.error = "Please make sure passwords match";
                }
                else if (vm.role == undefined || vm.role.name === "") {
                    vm.error = "Please select role";
                }
                else {
                    user.role = vm.role.name;
                    RegisterService.findSummonerByName(user.summonerName)
                        .then(function (found) {
                            if (found.status && found.status.status_code === 404) {
                                vm.error = "Summoner name not found. Please try again";
                            }
                            else {
                                RegisterService.createUser(user)
                                    .then(function (response) {
                                        $location.url('/ph/profile');
                                    });
                            }
                        });
                }
            }

        }]);
    return app;
});