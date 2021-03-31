const Post = require('../modals/post');

module.exports.create=function(req,res){
    Post.create({
        content : req.body.content,
        user : req.user._id
    },function(err,post){
        if(err)
        { 
            console.log("error in creating post in database",err);
            return;
        }
        return res.redirect('back');
    });
}