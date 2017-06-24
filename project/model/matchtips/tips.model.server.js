module.exports = function () {
    var mongoose = require("mongoose");
    var tipsSchema = require("./tips.schema.server")();
    var tipsModel = mongoose.model("TipsModel", tipsSchema);

    var factory = {
        searchMatchup: searchMatchup,
        addTip: addTip
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


}