module.exports = function (model) {
    var app = require('../../express');
    var q = require('q');
    var https = require('https');
    var http = require('http');
    var url = require('url');


    tipsModel = model.tipsModel;

    app.get('/api/tip', findAllTipsForUser);
    app.get('/api/tip/user/:uid', findAllTipsForUserId);
    app.post('/api/tip', addTip);
    app.get('/api/matchups/:c1/:c2', searchMatchUp);
    app.put('/api/tip/upvote/:tipId', upVoteTip);
    app.put('/api/tip/downvote/:tipId', downVoteTip);
    app.delete('/api/tip/:tipId', deleteTip);
    app.put('/api/tip/:tipId', updateTipContent);
    app.get('/api/tip/all', findAllTips);

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

    function downVoteTip(req, res) {
        var user = req.user;
        var tipId = req.params.tipId;
        tipsModel.findTipById(tipId)
            .then(function (result) {
                if (containsObject(user._id, result.voteBy)) {
                    res.sendStatus(400);
                }
                else {
                    result.downVotes = result.downVotes + 1;
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

    function findAllTipsForUser(req, res) {
        var user = req.user;
        tipsModel.findAllTipsForUser(user._id)
            .then(function (response) {
                    res.send(response);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });
    }

    function findAllTipsForUserId(req, res) {
        var userId = req.params.uid;
        tipsModel.findAllTipsForUser(userId)
            .then(function (response) {
                    res.send(response);
                },
                function (err) {
                    res.sendStatus(404).send(err);
                });


    }

    function deleteTip(req, res) {
        var tipId = req.params.tipId;
        var user = req.user;
        tipsModel.findTipById(tipId)
            .then(function (result) {
                if (user._id.equals(result.tipBy) || user.role === 'ADMIN') {
                    tipsModel.deleteTip(tipId)
                        .then(function (status) {
                                if (user._id.equals(result.tipBy)) {
                                    findAllTipsForUser(req, res);
                                }
                                else if (user.role === 'ADMIN') {
                                    findAllTips(req, res);
                                }
                            },
                            function (err) {
                                res.sendStatus(500).send(err);
                            });
                }
                else {
                    res.sendStatus(400);
                }
            });
    }

    function updateTipContent(req, res) {
        var tipContent = req.body;
        var tipId = req.params.tipId;
        var user = req.user;
        tipsModel.findTipById(tipId)
            .then(function (result) {
                if (user._id.equals(result.tipBy) || user.role === 'ADMIN') {
                    tipsModel.updateTipContent(tipId, tipContent)
                        .then(function (success) {
                                if (user._id.equals(result.tipBy)) {
                                    findAllTipsForUser(req, res);
                                }
                                else if (user.role === 'ADMIN') {
                                    findAllTips(req, res);
                                }
                            },
                            function (err) {
                                res.sendStatus(500).send(err);
                            });
                }
                else {
                    res.sendStatus(400);
                }
            });
    }

    function findAllTips(req, res) {
        var user = req.user;
        if (!'ADMIN' === user.role) {
            res.sendStatus(400);
        }
        else {
            tipsModel.findAllTips()
                .then(function (response) {
                        res.send(response);
                    },
                    function (err) {
                        res.sendStatus(404).send(err);
                    });
        }
    }
}
