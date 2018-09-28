// express init
const express = require('express');
const server = express();
const passport = require('passport');
const keys = require('./GraphQL/auth/config/keys');

//Database configuration
const mongoose = require('mongoose');
mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser: true}, ()=>{
    console.log('database connected');
    
});

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
var cookieSession = require('cookie-session');
var flash = require('connect-flash');
server.use(flash())
server.use(express.static('public'));

server.use(cookieSession({
    maxAge: 24 *60 *60 *1000,
    keys:[keys.session.cookieKey]
  }));

//initialize passport
server.use(passport.initialize());
server.use(passport.session());

//router configs

const loginRouter = require("./GraphQL/auth/controllers/login/loginRouter");
server.use('/auth',loginRouter);


//defining passport strategies
require('./GraphQL/auth/config/passport-setup');




// server configuration
var port = process.env.PORT || 9000;
server.listen(port,()=>{
    console.log("server  on");
    
});
