define(['app'], function (app) {
    app.factory('TipsService', function ($http) {
        var factory = {
            searchMatchup: searchMatchup,
        };


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