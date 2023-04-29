const express = require('express');
const port = 7878;
              
const app = express();

const path = require('path');   

const passport = require('passport')

const PassportLocal = require('./config/passport-local-strategy');

const session = require('express-session');

const  connectMongo = require("connect-mongo");

      
const cookie = require('cookie-parser');

app.set('view-engine','ejs');
app.set('/views',path.join(__dirname,'views'));
              
app.use(session({
    name : 'malay',
    secret : 'RNW3',
    saveUninitialized : false,
    resave : false,
    store: new connectMongo({
        mongoUrl : "mongodb://127.0.0.1/passport-auth",
        collection : "sessions"
    }),
    cookie : {
        maxAge : 1000*60*60
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentication);
app.use(cookie());

app.use(express.static(path.join(__dirname,'/public')));

const db = require('./config/mongoose');

app.use(express.urlencoded())
app.use('/',require('./routes/index'));


app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log("Server is start on "+port);
})