// require the library
const express = require('express');

// require the cookies
const cookieParser = require('cookie-parser');

// fire up the server
const app = express();

// port to run the server
const port = 8000;

// require the library layout
const expressLayouts = require('express-ejs-layouts');

// connecting to the database
const db = require('./config/mongoose');

// setting up the session cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// call to use expresslayouts
app.use(expressLayouts);

// middleware to parse the request
app.use(express.urlencoded());

// middleware for cookie parser
app.use(cookieParser());

// extract script and style from subfiles to layouts
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

// for including static files
app.use(express.static('assets'));

// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

// middleware to session cookie
app.use(session({
    name : 'codial',
    // TODO change the secret before deployment in production code
    secret : 'blahsomething',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    }
}));

// to tell app to use passport
app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/',require('./routes'));
app.use('/users',require('./routes/users'));

// checking whether server is running or not
app.listen(port,function(err){
     if(err)
     {
         console.log(`Error in running the server : ${err}`);
         return;
     }
     console.log(`Server is up and running on port : ${port}`);
});
