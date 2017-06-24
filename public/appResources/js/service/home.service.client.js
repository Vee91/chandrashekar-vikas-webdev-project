define(['app'], function (app) {
    app.factory('HomeService', function ($http) {
        var factory = {
            findAllChampions: findAllChampions,
        };

        function findAllChampions() {
            var url = "/api/champions";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        return factory;
    });
});