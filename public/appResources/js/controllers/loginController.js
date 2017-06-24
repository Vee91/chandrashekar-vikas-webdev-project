define(['app', 'registerService'], function (app) {
    app.controller('loginCntrl',
        ['$location', '$routeParams', 'RegisterService', function ($location, $routeParams, RegisterService) {
            var vm = this;

            vm.login = login;

            function login(user) {
                RegisterService.login(user)
                    .then(function (found) {
                        if (found === 'Unauthorized') {
                            vm.error = "Username and password combination not recognised. Please try again";
                        }
                        else {
                            $location.url('/ph/profile');
                        }
                    });
            }

        }]);
    return app;
});