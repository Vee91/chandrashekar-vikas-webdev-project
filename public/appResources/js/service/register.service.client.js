define(['app'], function (app) {
    app.factory('RegisterService', function ($http) {
        var factory = {
            findSummonerByName: findSummonerByName,
            createUser: createUser,
            login: login,
            loggedIn: loggedIn
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
                }, function (err) {
                    return err.data;
                });
        }

        function loggedIn() {
            return $http.post("/api/loggedin").then(
                function (response) {
                    return response.data;
                });
        }

        return factory;
    });
});