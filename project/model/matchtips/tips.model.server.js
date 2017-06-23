module.exports = function () {
    var mongoose = require("mongoose");
    var tipsSchema = require("./tips.schema.server")();
    var tipsModel = mongoose.model("TipsModel", tipsSchema);

    var factory = {
        searchMatchup: searchMatchup
    };
    return factory;

    function searchMatchup(champ1, champ2) {
        return tipsModel.find({
            champ1: champ1,
            champ2: champ2
        });
    }


}