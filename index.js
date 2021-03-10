// require the library
const express = require('express');

// fire up the server
const app = express();

// port to run the server
const port = 8000;

// set up view engine
app.set('view engine','ejs');
app.set('view','./views');

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
