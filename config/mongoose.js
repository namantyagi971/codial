const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_db');

const db = mongoose.connection;

db.on('error',console.error.bind("Oops!! Error in connecting to the databse"));

db.once('open',function(){
    console.log("yeah!!! finally we have our MongoDB");
});

module.exports = db;