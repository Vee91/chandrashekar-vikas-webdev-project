module.exports = function () {
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server")();
    var userModel = mongoose.model("UserModel", userSchema);

    var factory = {
        createUser: createUser,
        findUserBySummonerName: findUserBySummonerName,
        findUserById: findUserById
    };
    return factory;

    function createUser(user) {
        return userModel.create(user);
    }

    function findUserBySummonerName(summonerName) {
        return userModel.findOne({
            summonerName: summonerName
        });
    }

    function findUserById(userid) {
        return userModel.findById(userid);
    }
}