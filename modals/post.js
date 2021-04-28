// require the library
const mongoose = require('mongoose');

// creating the post schema
const postSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }],
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Like'
    }]
},{
    timestamps : true
});

// storing in database as collection(posts)
const Post = mongoose.model('Post',postSchema);

// exporting to required by other files
module.exports = Post;