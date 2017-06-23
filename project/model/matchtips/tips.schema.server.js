module.exports = function () {
    var mongoose = require("mongoose");
    var TipsSchema = mongoose.Schema({
        champ1: {type: String, required: true},
        champ2: {type: String, required: true},
        tips: String
    }, {collection: "tips"});
    return TipsSchema;
};