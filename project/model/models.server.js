var mongoose = require("mongoose");
var connectionString = 'mongodb://localhost/riotgames';

if(process.env.DB_USERNAME) {
    var username = process.env.DB_USERNAME;
    var password = process.env.DB_PASSWORD;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds133582.mlab.com:33582/heroku_rsm25rgv';
}

mongoose.connect(connectionString);
var tipsModel = require("./matchtips/tips.model.server")();
var model = {
    tipsModel: tipsModel
};

module.exports = model;
