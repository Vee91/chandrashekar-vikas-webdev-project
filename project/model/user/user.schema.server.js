module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        summonerName: {type: String, required: true, unique: true},
        role: {type: String, required: true, enum: ['COACH', 'TRAINEE', 'ADMIN']},
        dateCreated: {type: Date, default: Date.now},
    }, {collection: "user"});
    return UserSchema;
};