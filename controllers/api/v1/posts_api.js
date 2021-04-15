const Post = require('../../../modals/post');
const Comment = require('../../../modals/comment');

module.exports.index = async function(req,res){
    let posts = await Post.find({})
       // this is used to sort the post according to nearest time first
       .sort('-createdAt')
       .populate('user')
            //  this is nested population
            .populate({
                path : 'comments',
                populate : {
                    path : 'user'
                }
            });
    
    
    
    return res.json(200,{
        message : "List of posts",
        posts : posts
    });
}

module.exports.destroy = async function(req,res){
    try{
        console.log("**** params",req.params.id);
        let post = await Post.findById(req.params.id);
            post.remove();
            await Comment.deleteMany({post:req.params.id});
            return res.json(200,{
                message : "post and associated comments get deleted"
            });
    }catch(err){
        console.log("********",err);
        return res.json(500,{
            message : "Internal Server Error"
        }); 
    }
}