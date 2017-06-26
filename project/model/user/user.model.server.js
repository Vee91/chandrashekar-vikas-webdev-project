module.exports = function () {
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server")();
    var userModel = mongoose.model("UserModel", userSchema);

    var factory = {
        createUser: createUser,
        findUserBySummonerName: findUserBySummonerName,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        deleteUser: deleteUser,
        updateUser: updateUser,
        subscribe: subscribe,
        unsubscribe: unsubscribe
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

    function findAllUsers() {
        return userModel.find();
    }

    function deleteUser(userId) {
        return userModel.remove({
            _id: userId
        });
    }

    function updateUser(userId, userContent) {
        return userModel.update(
            {_id: userId},
            {
                summonerName: userContent.summonerName,
                role: userContent.role
            });
    }

    function subscribe(by, to) {
        return userModel.update(
            {_id: by},
            {
                subscribedTo: to
            });
    }

    function unsubscribe(userId, unsubId) {
        return userModel
            .findById(userId)
            .then(function (user) {
                var index = user.subscribedTo.indexOf(unsubId);
                user.subscribedTo.splice(index, 1);
                return user.save();
            });
    }
}