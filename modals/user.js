// inproting the mongoose
const mongoose = require('mongoose');

// creating database schema. 
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    name : {
        type : String,
        required : true
    }
},{
    timestamps : true
});

// timestamps : true will create two field in our model createdAt and updatedAt

// registering our schema with mongoose so that it can be accessed anywhere in the document 
const User  = mongoose.model('User',userSchema);

// exporting to use by other files
module.exports = user;
