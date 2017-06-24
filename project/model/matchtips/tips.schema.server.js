module.exports = function () {
    var mongoose = require("mongoose");
    var TipsSchema = mongoose.Schema({
        champ1: {type: String, required: true},
        champ1Id: Number,
        champ2: {type: String, required: true},
        champ2Id: Number,
        tips: String,
        tipBy: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
        tipByName: String,
        dateCreated: {type: Date, default: Date.now},
        upVotes: Number,
        downVotes: Number,
        voteBy: [{type: mongoose.Schema.Types.ObjectId, ref: "userModel"}],
    }, {collection: "tips"});
    return TipsSchema;
};