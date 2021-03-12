// require the library
const express = require('express');

// require the library layout
const expressLayouts = require('express-ejs-layouts');

// fire up the server
const app = express();

// call to use expresslayouts
app.use(expressLayouts);

// extract script and style from subfiles to layouts
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

// for including static files
app.use(express.static('assets'));


// port to run the server
const port = 8000;

// set up view engine
app.set('view engine','ejs');
app.set('views','./views');

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
