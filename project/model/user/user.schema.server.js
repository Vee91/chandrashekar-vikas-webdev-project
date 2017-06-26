module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        password: {type: String, required: true},
        summonerName: {type: String, required: true, unique: true},
        role: {type: String, required: true, enum: ['COACH', 'TRAINEE', 'ADMIN']},
        subscribedTo: [{type: mongoose.Schema.Types.ObjectId, ref: "userModel"}],
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "user"});
    return UserSchema;
};