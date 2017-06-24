module.exports = function () {
    var mongoose = require("mongoose");
    var tipsSchema = require("./tips.schema.server")();
    var tipsModel = mongoose.model("TipsModel", tipsSchema);

    var factory = {
        searchMatchup: searchMatchup,
        addTip: addTip,
        findTipById: findTipById,
        updateTip: updateTip
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



}