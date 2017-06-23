module.exports = function () {
    var mongoose = require("mongoose");
    var userSchema = require("./user.schema.server")();
    var userModel = mongoose.model("UserModel", userSchema);

    var factory = {
        createUser: createUser
    };
    return factory;

    function createUser(user) {
        return userModel.create(user);
    }
}