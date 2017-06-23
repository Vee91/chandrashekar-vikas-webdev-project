define(['app'], function (app) {
    app.controller('profileCntrl',
        ['$location', '$routeParams', function ($location, $routeParams) {
            var vm = this;
            vm.hidelogin = true;

        }]);
    return app;
});