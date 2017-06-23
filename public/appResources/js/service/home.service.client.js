define(['app'], function (app) {
    app.factory('HomeService', function ($http) {
        var factory = {
            findAllChampions: findAllChampions,
            searchMatchup: searchMatchup,
        };

        function findAllChampions() {
            var url = "/api/champions";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function searchMatchup(champ1, champ2) {
            var url = "/api/matchups/"+champ1+"/"+champ2;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        return factory;
    });
});