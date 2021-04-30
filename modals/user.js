// inproting the mongoose
const mongoose = require('mongoose');
// inporting the multer
const multer = require('multer');
const path = require('path');
// path is used to convert string path to url
const AVATAR_PATH = path.join('/uploads/users/avatars');

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
    },
    avatar : {
      type : String
    },
    friendships : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Friendship'
      }
    ]
},{
    timestamps : true
});

// timestamps : true will create two field in our model createdAt and updatedAt

// storing file at local storage through multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });

// static methods
userSchema.statics.uploadedAvatar = multer({storage : storage}).single('avatar');

// this is used to make path of file publicly
userSchema.statics.avatarPath = AVATAR_PATH;

// registering our schema with mongoose so that it can be accessed anywhere in the document 
const User  = mongoose.model('User',userSchema);

// exporting to use by other files
module.exports = User;
