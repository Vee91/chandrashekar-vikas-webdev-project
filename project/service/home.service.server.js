module.exports = function (model) {
    var app = require('../../express');
    var q = require('q');
    var https = require('https');
    var http = require('http');
    var url = require('url');

    app.get('/api/champions', findChampions);
    app.get('/api/matchups/:c1/:c2', searchMatchUp);

    tipsModel = model.tipsModel;

    function findChampions(req, res) {
        findChampionsQuery().then(function (response) {
            res.json(response.data);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
    }

    function searchMatchUp(req, res) {
        var champ1 = req.params.c1;
        var champ2 = req.params.c2;
        tipsModel.searchMatchup(champ1, champ2)
            .then(function (response) {
                    console.log('Correct');
                    res.send(response);
                },
                function (err) {
                    console.log('Here');
                    res.sendStatus(404).send(err);
                });
    }

    function findChampionsQuery() {
        var reqUrl = "https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=RGAPI-09f90e04-e9da-4bf1-8375-36ffe2d23bdc";
        var parsedUrl = url.parse(reqUrl);

        var deferred = q.defer();
        https.get({
            host: parsedUrl.host,
            path: parsedUrl.path,
            headers: {
                "Accept": "application/json",
            }
        }, function (response) {
            var body = '';
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                try {
                    body = JSON.parse(body);
                    deferred.resolve(body);
                } catch (err) {
                    deferred.reject({error: err});
                }
            });
        });
        return deferred.promise;

    }

}
