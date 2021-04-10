// inproting the mongoose
const mongoose = require('mongoose');
// inporting the multer
const multer = require('multer');
const path = require('path');
// path is used to convert string path to url
const AVATAR_PATH = path.join('/uploads/user/avatars');

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

// storing file at local storage through multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

// registering our schema with mongoose so that it can be accessed anywhere in the document 
const User  = mongoose.model('User',userSchema);

// exporting to use by other files
module.exports = User;
