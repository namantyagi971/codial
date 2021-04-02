// importing the mongoose
const mongoose = require('mongoose');

// creating a comment schema
const commentSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    // comments on which post
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Post'
    },
    // which user comments
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
});

// telling mongoose the name of collection is Comment
const Comment = mongoose.model('Comment',commentSchema);

// exporting to use
module.exports = Comment;