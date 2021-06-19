// importing mongoose from library
const mongoose = require('mongoose');
const env = require('./environment');

//connecting to database mongodb and object to get rid if deprecated warnings
mongoose.connect(`mongodb://localhost/${env.db}`,{useNewUrlParser:true,useUnifiedTopology:true});

// acquiring the connection
const db = mongoose.connection;


// on error
db.on('error',console.error.bind("Oops!! Error in connecting to the databse"));

// on successfully connected to database
db.once('open',function(){
    console.log("yeah!!! finally we have our MongoDB");
});

// exporting to use by other files
module.exports = db;