define(['app'], function (app) {
    app.factory('RegisterService', function ($http) {
        var factory = {
            findSummonerByName: findSummonerByName,
            createUser: createUser,
            login: login
        };

        function findSummonerByName(sName) {
            var url = "/api/summoner/" + sName;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(user) {
            return $http.post("/api/register", user).then(
                function (response) {
                    return response.data;
                });
        }

        function login(user) {
            var url = "/api/login";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        return factory;
    });
});