const mongoose = require('mongoose');
const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId
    },
    // this field is used to define the id of likeable oobject
    likeable : {
        type : mongoose.Schema.ObjectId,
        required : true,
        refPath : 'onModel'
    },
    // this field is used for defining type of likeable object since this is dynamic reference
    onModel : {
        type : String,
        required : true,
        enum  : ['Post', 'Comment']
    }
},{
    timestamps : true
});

// telling mongoose that it is a model
const Like = mongoose.model('Like',likeSchema);

module.exports = Like;
