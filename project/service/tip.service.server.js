module.exports = function (model) {
    var app = require('../../express');
    var q = require('q');
    var https = require('https');
    var http = require('http');
    var url = require('url');


    tipsModel = model.tipsModel;

    app.post('/api/tip', addTip);
    app.get('/api/matchups/:c1/:c2', searchMatchUp);
    app.put('/api/tip/upvote/:tipId', upVoteTip);

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
        tipsModel.searchMatchup(tip.champ1Id, tip.champ2Id)
            .then(function (response) {
                    console.log(response);
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

    function upVoteTip(req, res) {
        var user = req.user;
        var tipId = req.params.tipId;
        tipsModel.findTipById(tipId)
            .then(function (result) {
                if (containsObject(user._id, result.voteBy)) {
                    res.sendStatus(400);
                }
                else {
                    result.upVotes = result.upVotes + 1;
                    var v = result.voteBy;
                    v.push(user._id);
                    result.voteBy = v;
                    tipsModel.updateTip(tipId, result)
                        .then(function (success) {
                                findAllTipsForMatchup(req, res);
                            },
                            function (err) {
                                res.sendStatus(500).send(err);
                            });
                }
            });
    }

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].equals(obj)) {
                return true;
            }
        }
        return false;
    }
}
