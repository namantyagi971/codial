const mongoose = require('mongoose');
const frienshipSchema = new mongoose.Schema({
    // for the user who have sent the request
    from_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    // for user who accpeted the friend request
    to_user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
},{
    timestamps : true
});

// telling mongoose that this is our new model
const Friendship = mongoose.model('Friendship',frienshipSchema);
module.exports = Friendship;