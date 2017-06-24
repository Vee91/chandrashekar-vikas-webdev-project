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
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    userModel = model.userModel;

    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/loggedin', loggedin);

    function localStrategy(username, password, done) {
        userModel.findUserBySummonerName(username)
            .then(function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    else if(bcrypt.compareSync(password, user.password)){
                        return done(null, user);
                    }
                    return done(null, false);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                });
    }


    app.get('/api/summoner/:sName', findSummonerByName);
    app.post('/api/register', register);


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
        var user = req.user;
        res.json(user);
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel.findUserById(user._id)
            .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
    };

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

}
