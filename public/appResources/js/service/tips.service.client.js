define(['app'], function (app) {
    app.factory('TipsService', function ($http) {
        var factory = {
            searchMatchup: searchMatchup,
            addTip: addTip,
            findChampById: findChampById,
            upVoteTip: upVoteTip
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

        return factory;
    });
});