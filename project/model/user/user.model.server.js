module.exports = function () {
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server")();
    var userModel = mongoose.model("UserModel", userSchema);

    var factory = {
        createUser: createUser,
        findUserByName: findUserByName,
        findUserById: findUserById
    };
    return factory;

    function createUser(user) {
        return userModel.create(user);
    }

    function findUserByName(username) {
        return userModel.findOne({
            username: username
        });
    }

    function findUserById(userid) {
        return userModel.findById(userid);
    }
}