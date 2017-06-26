module.exports = function () {
    var mongoose = require("mongoose");
    var tipsSchema = require("./tips.schema.server")();
    var tipsModel = mongoose.model("TipsModel", tipsSchema);

    var factory = {
        searchMatchup: searchMatchup,
        addTip: addTip,
        findTipById: findTipById,
        updateTip: updateTip,
        findAllTipsForUser: findAllTipsForUser,
        deleteTip: deleteTip,
        updateTipContent: updateTipContent,
        findAllTips: findAllTips,
        findSubscribedTips: findSubscribedTips
    };
    return factory;

    function searchMatchup(champ1, champ2) {
        return tipsModel.find({
            champ1Id: champ1,
            champ2Id: champ2
        });
    }

    function addTip(tip) {
        return tipsModel.create(tip);
    }

    function updateTip(tipId, tip) {
        return tipsModel.update(
            {
                _id: tipId
            },
            {
                upVotes: tip.upVotes,
                downVotes: tip.downVotes,
                voteBy: tip.voteBy,

            }
        );
    }

    function findTipById(tipId) {
        return tipsModel.findById(tipId);
    }

    function findAllTipsForUser(userId) {
        return tipsModel.find({
            tipBy: userId
        });
    }

    function deleteTip(tipId) {
        return tipsModel.remove({
            _id: tipId
        });
    }

    function updateTipContent(tipId, tipContent) {
        if (tipContent.champ1) {
            return tipsModel.update(
                {_id: tipId},
                {
                    tips: tipContent.tip,
                    champ1: tipContent.champ1,
                    champ2: tipContent.champ2,
                    champ1Id: tipContent.champ1Id,
                    champ2Id: tipContent.champ2Id
                });
        }
        else {
            return tipsModel.update(
                {_id: tipId},
                {tips: tipContent.tip,});
        }
    }

    function findAllTips() {
        return tipsModel.find();
    }

    function findSubscribedTips(subscribedTo) {
        return tipsModel.find({
            tipBy: {$in: [subscribedTo]}
        });
    }
}