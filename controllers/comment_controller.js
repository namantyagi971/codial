const Comment = require('../modals/comment');
const Post = require('../modals/post');

module.exports.create = function(req,res){
    // check whether post exist in database (bacuase any user can fiddle our website by inspecting HTML)
    console.log("post id : ",req.body.post);
    Post.findById(req.body.post,function(err,post){
        if(err)
        {
            console.log("Error in finding post from database",err);
            return res.redirect('/');
        }
        // if the post exists,then create comments
        if(post){
        Comment.create({
            content : req.body.content,
            post : post._id,// or req.body.post
            user : req.user._id
        },function(err,comment){
            // this is my first updation
            // now saving comment id in post collection
            post.comments.push(comment.id);   // or post.comments.push(comment/comment._id) it will also works as mongoose will fetch only id
            // now telling mongodb to save it
            post.save();
            return res.redirect('back');
        });
        }
    });
}