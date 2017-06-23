var app = require('./express');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: 'this is the secret',
    resave: true,
    saveUninitialized: true
}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

app.get('/ph/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

/*require ("./test/app.js")(app);*/
require("./project/app");

var port = process.env.PORT || 3000;

app.listen(port);