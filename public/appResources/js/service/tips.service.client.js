define(['app'], function (app) {
    app.factory('TipsService', function ($http) {
        var factory = {
            searchMatchup: searchMatchup,
            addTip: addTip,
            findChampById: findChampById,
            upVoteTip: upVoteTip,
            downVoteTip: downVoteTip,
            findAllTipsForUser: findAllTipsForUser,
            findAllTipsForUserId: findAllTipsForUserId
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

        function upVoteTip(tip, userId) {
            var url = "/api/tip/upvote/" + tip._id;
            return $http.put(url, tip)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err;
                });
        }

        function downVoteTip(tip, userId) {
            var url = "/api/tip/downvote/" + tip._id;
            return $http.put(url, tip)
                .then(function (response) {
                    return response.data;
                }, function (err) {
                    return err;
                });
        }

        function findAllTipsForUser(userId) {
            var url = "/api/tip";
            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

        function findAllTipsForUserId(userId) {
            var url = "/api/tip/user/"+userId;
            return $http.get(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

        return factory;
    });
});