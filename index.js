// express init
const express = require('express');
const server = express();

// Startup database connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/itransportation');

// deployment requirements
const compression = require('compression');
const helmet = require('helmet');
server.use(compression());
server.use(helmet());

// project config
server.set('view engine','ejs');
server.use(express.static('public'));
server.set("views",'./views');

// session options
var session = require('express-session');
var flash = require('connect-flash');
server.use(flash())
server.use(express.static('public'));
server.use(session({
    secret:"$9*445#@0"
}));

// server configuration
var port = process.env.PORT || 9000;
server.listen(port);
