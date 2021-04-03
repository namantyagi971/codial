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
        await Post.create({
                content : req.body.content,
                user : req.user._id
                });
        return res.redirect('back');
    }catch(err){
        console.log("error",err);
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
            return res.redirect('back');
        }
        else
        {
            return res.redirect('back');
        }
    }catch(err){
        console.log("error",err);
        return; 
    }
}