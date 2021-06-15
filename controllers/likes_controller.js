// importing 3 modals
const Like = require('../modals/likes');
const Post = require('../modals/post');
const Comment = require('../modals/comment');

module.exports.toggleLikes = async function(req,res){
    try{
        let likeable;
        // deleted is a boolean variable which deleted the like if exists
        let deleted=false;
        // expected url : likes/toggle/?id=abcd....&type=post/comment

        // checking whether liking object is post or comment
        if(req.query.type=='Post')
        {
            likeable = await Post.findById(req.query.id).populate('likes');
            // .populate('likes') is used to show the existing likes on post
        }
        else
        {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // check whether like already exists or not 
        let existingLike = await Like.findOne({
            user : req.user._id,
            likeable : req.query.id,
            onModel : req.query.type
        });

        // if like exists, then delete it
        if(existingLike)
        {
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted = true;
        }
        else
        {
            let newLike = await Like.create({
                user : req.user._id,
                likeable : req.query.id,
                onModel : req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }

        // return response in JSON format to front end
        return res.json(200,{
            message : 'request successful',
            data : {
                deleted : deleted
            }
        });
    }catch(err){
        console.log("*** error in likes controllers",err);
        return res.json(500,{
            message : 'Internal Server Error'
        });
    }
}