define(['app', 'registerService'], function (app) {
    app.controller('loginCntrl',
        ['$location', '$routeParams', 'RegisterService', function ($location, $routeParams, RegisterService) {
            var vm = this;

            vm.login = login;

            function login(user) {
                RegisterService.login(user)
                    .then(function (found) {

                    });
            }

        }]);
    return app;
});