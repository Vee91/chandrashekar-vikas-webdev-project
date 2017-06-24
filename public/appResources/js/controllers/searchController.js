define(['app', 'homeService'], function (app) {
    app.controller('searchCntrl',
        ['$location', 'HomeService', 'currentUser', function ($location, HomeService, currentUser) {
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
                    });
            }

            init();

            function searchMatchUp(champ1, champ2) {
                $location.url("/ph/searchtips/" + champ1.id + "/vs/" + champ2.id);
            }

        }]);
    return app;
});