define(['app'], function (app) {
    app.factory('TipsService', function ($http) {
        var factory = {
            searchMatchup: searchMatchup,
            addTip: addTip,
            findChampById: findChampById
        };

        function searchMatchup(champ1, champ2) {
            var url = "/api/matchups/" + champ1 + "/" + champ2;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function addTip(tip) {
            var url = "/api/tip";
            return $http.post(url, tip)
                .then(function (response) {
                    return response.data;
                });
        }

        function findChampById(champId) {
            var url = "/api/champion/" + champId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        return factory;
    });
});