// require the library
const express = require('express');

// importing the enviroment file
const env = require('./config/environment');
console.log("****env name : ",env.name);

// require morgan
const logger = require('morgan');

// require the cookies
const cookieParser = require('cookie-parser');

// cors is used when resource is sharing on many places 
const cors = require('cors');


// fire up the server
const app = express();
require('./config/view-helpers')(app);

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
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// require the library
const MongoStore = require('connect-mongo')(session);

// require the library
const sassMiddleware = require('node-sass-middleware');

// using flash library
const flash = require('connect-flash');

// using our own middleware for flash messages
const customMware = require('./config/middleware');

// setup the chat server by using express to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000); // othet than main port i.e, 8000
console.log("chat server is listening on port 5000");

// setting path
const path = require('path');

// setting the sass middleware (just before the server starts as templates need precompiled files)
if(env.name=='development')
{
    app.use(sassMiddleware({
        src : path.join(__dirname,env.asset_path,'scss'),
        dest : path.join(__dirname,env.asset_path,'css'),
        debug : true,
        outputStyle : 'extended',
        prefix : '/css'
    }));
}


app.use(cors());

// middleware to parse the request
app.use(express.urlencoded({extended:false}));

// middleware for cookie parser
app.use(cookieParser());

// for including static files
app.use(express.static(env.asset_path));

// make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

// morgan middleware to store all the consoles in log files
app.use(logger(env.morgan.mode,env.morgan.options));

// call to use expresslayouts
app.use(expressLayouts);

// extract script and style from subfiles to layouts
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

// mongoStore to store session cookie in mongoDB
app.use(session({
    name : 'codial',
    // TODO change the secret before deployment in production code
    secret : env.session_cookie_key,
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000*60*100)
    },
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
    },function(err){
        console.log(err||'mongostore connects to mongodb');
    })
}));

// to tell app to use passport
app.use(passport.initialize());

// it will create session for user
app.use(passport.session());

// it will store current signed in user in locals
app.use(passport.setAuthenticatedUser);

// after session got set up,i need to store flash messages in session
app.use(flash());
app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes'));
app.use('/users',require('./routes/users'));
app.use('/posts',require('./routes/posts'));
app.use('/comments',require('./routes/comments'));

// checking whether server is running or not
app.listen(port,function(err){
     if(err)
     {
         console.log(`Error in running the server : ${err}`);
         return;
     }
     console.log(`Server is up and running on port : ${port}`);
});
