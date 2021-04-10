// importing the schema 
const Post = require('../modals/post');
const Comment = require('../modals/comment');

// creating the post in database

// module.exports.create= function(req,res){
//     // Post.create({
//     //     content : req.body.content,
//     //     user : req.user._id
//     // },function(err,post){
//     //     if(err)
//     //     { 
//     //         console.log("error in creating post in database",err);
//     //         return;
//     //     }
//     //     return res.redirect('back');
//     // });
// }

// creating post in db  using async await

module.exports.create= async function(req,res){
    try{
        let post = await Post.create({
                content : req.body.content,
                user : req.user._id,
                });
        if(req.xhr){
            return res.status(200).json({
                    data : {
                        post : post
                },
                message : "Post Created!"
            });
        }
        req.flash('success','Post Published!');

        return res.redirect('back');
    }catch(err){
        req.flash('error',err);
        return;
    }
}

// // deleting the post from database
// module.exports.destroy = function(req,res){
//     //checking if the post exist or not because someone can fiddle my website through HTML inspect
//     Post.findById(req.query.id,function(err,post){
//         if(err)
//         {
//             console.log("error in finding post from database",err);
//             return;
//         }
//         // if the current signed in user is same as the user who written the post
//         // .id converts the object id into string
//         if(req.user.id==post.user)
//         {
//             post.remove();
//             Comment.deleteMany({post:req.query.id},function(err){
//                 return res.redirect('back');
//             });
//         }
//         else
//         {
//             return res.redirect('back');
//         }
       
//     });
// }

// deleting post from db using async await
module.exports.destroy = async function(req,res){
    try{
        let post = await Post.findById(req.query.id);
        if(req.user.id==post.user)
        {
            post.remove();
            await Comment.deleteMany({post:req.query.id});
            if(req.xhr)
            {
                return res.status(200).json({
                    data : {
                        post_id : req.query.id,
                    },
                    message: 'Post Deleted!'
                });
            }
            req.flash('success','Post and associated comments gets deleted!');
            return res.redirect('back');
        }
        else
        {
            req.flash('error','You cannot delete this post');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error',err);
        return; 
    }
}