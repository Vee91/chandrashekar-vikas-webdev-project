module.exports = function (model) {
    var app = require('../../express');
    var q = require('q');
    var https = require('https');
    var http = require('http');
    var url = require('url');
    var bcrypt = require("bcrypt-nodejs");
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(localStrategy));
    
    function localStrategy() {
        
    }

    userModel = model.userModel;

    app.get('/api/summoner/:sName', findSummonerByName);
    app.post('/api/register', register);
    app.post('/api/login', login);

    function findSummonerByName(req, res) {
        var summonerName = req.params.sName;
        findSummonerByNameQuery(summonerName)
            .then(function (response) {
                res.json(response);
            }, function (error) {
                res.sendStatus(404).send(error);
            });
    }

    function findSummonerByNameQuery(summonerName) {
        var reqUrl = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + summonerName + "?api_key=RGAPI-09f90e04-e9da-4bf1-8375-36ffe2d23bdc";
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

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user).then(
            function (user) {
                if (user) {
                    res.json(user);
                }
            }, function (err) {
            }
        );
    }

    function login(req, res) {
        var user = req.body;
        console.log(user);
    }

}
