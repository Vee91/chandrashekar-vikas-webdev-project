var model = require("./model/models.server.js");
require("./service/home.service.server.js")(model);
require("./service/user.service.server.js")(model);
require("./service/tip.service.server.js")(model);