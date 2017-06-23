define(['app'], function (app) {
    app.factory('RegisterService', function ($http) {
        var factory = {
            findSummonerByName: findSummonerByName
        };

        function findSummonerByName(sName) {
            var url = "/api/summoner/"+sName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }
        return factory;
    });
});