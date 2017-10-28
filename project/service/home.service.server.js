module.exports = function (model) {
    var app = require('../../express');
    var q = require('q');
    var https = require('https');
    var http = require('http');
    var url = require('url');

    app.get('/api/champions', findChampions);
    app.get('/api/champion/:champId', getChampion);

    tipsModel = model.tipsModel;

    function findChampions(req, res) {
        findChampionsQuery().then(function (response) {
            res.json(response.data);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
    }


    function findChampionsQuery() {
        var reqUrl = "https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=RGAPI-32bdc2ff-1496-45eb-a113-bd6f107350a1";
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

    function getChampion(req, res) {
        var champId = req.params.champId;
        getChampionQuery(champId).then(function (response) {
            res.json(response);
        }, function (error) {
            res.sendStatus(404).send(error);
        });
    }

    function getChampionQuery(champId) {
        var reqUrl = "https://na1.api.riotgames.com/lol/static-data/v3/champions/"+champId+"?locale=en_US&tags=image&api_key=RGAPI-32bdc2ff-1496-45eb-a113-bd6f107350a1";
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
