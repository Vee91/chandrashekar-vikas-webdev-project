define(['app'], function (app) {
    app.factory('RegisterService', function ($http) {
        var factory = {
            findSummonerByName: findSummonerByName,
            createUser: createUser,
            login: login,
            loggedIn: loggedIn,
            findAllUsers: findAllUsers,
            deleteUser: deleteUser,
            updateUser: updateUser,
            subscribe: subscribe,
            unsubscribe: unsubscribe
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

        function findAllUsers() {
            var url = "/api/users/all";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err;
                });
        }

        function deleteUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, userContent) {
            var url = "/api/user/" + userId;
            return $http.put(url, userContent)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err;
                });
        }

        function subscribe(userId) {
            return $http.post("/api/user/subscribe/"+userId).then(
                function (response) {
                    return response.data;
                }, function (err) {
                    return err;
                });
        }

        function unsubscribe(userId) {
            return $http.post("/api/user/unsubscribe/"+userId).then(
                function (response) {
                    return response.data;
                }, function (err) {
                    return err;
                });
        }
        return factory;
    });
});