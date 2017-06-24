module.exports = function (model) {
    var app = require('../../express');
    var q = require('q');
    var https = require('https');
    var http = require('http');
    var url = require('url');


    tipsModel = model.tipsModel;

    app.post('/api/tip', addTip);
    app.get('/api/matchups/:c1/:c2', searchMatchUp);

    function addTip(req, res) {
        var tip = req.body;
        tipsModel.addTip(tip)
            .then(function (status) {
                    if (status) {
                        findAllTipsForMatchup(req, res);
                    }
                },
                function (err) {
                    res.sendStatus(500).send(err);
                }
            );
    }

    function findAllTipsForMatchup(req, res) {
        var tip = req.body;
        tipsModel.searchMatchup(tip.champ1, tip.champ2)
            .then(function (response) {
                    res.send(response);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });
    }

    function searchMatchUp(req, res) {
        var champ1 = req.params.c1;
        var champ2 = req.params.c2;
        tipsModel.searchMatchup(champ1, champ2)
            .then(function (response) {
                    res.send(response);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });
    }
}
