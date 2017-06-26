define(['app', 'homeService'], function (app) {
    app.controller('homeCntrl',
        ['$location', 'HomeService', function ($location, HomeService) {
            var vm = this;

            vm.searchMatchUp = searchMatchUp;

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
            }

            init();

            function searchMatchUp() {
                $location.url("/ph/tips/" + vm.champ1.id + "/vs/" + vm.champ2.id);
            }

        }]);
    return app;
});