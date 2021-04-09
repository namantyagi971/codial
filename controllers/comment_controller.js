const Comment = require('../modals/comment');
const Post = require('../modals/post');
const User = require('../modals/user');

// creating comment in db
// module.exports.create = function(req,res){
//     // check whether post exist in database (bacuase any user can fiddle our website by inspecting HTML)
//     console.log("post id : ",req.body.post);
//     Post.findById(req.body.post,function(err,post){
//         if(err)
//         {
//             console.log("Error in finding post from database",err);
//             return res.redirect('/');
//         }
//         // if the post exists,then create comments
//         if(post){
//         Comment.create({
//             content : req.body.content,
//             post : post._id,// or req.body.post
//             user : req.user._id
//         },function(err,comment){
//             // this is my first updation
//             // now saving comment id in post collection
//             post.comments.push(comment.id);   // or post.comments.push(comment/comment._id) it will also works as mongoose will fetch only id
//             // now telling mongodb to save it
//             post.save();
//             return res.redirect('back');
//         });
//         }
//     });
// }

// creating comment in db using async await
module.exports.create = async function(req,res){
    try{
        // check whether post exist in database (bacuase any user can fiddle our website by inspecting HTML)
        let post = await Post.findById(req.body.post)
        // if the post exists,then create comments
        if(post)
        {
            let comment = await Comment.create({
                content : req.body.content,
                post : post._id,// or req.body.post
                user : req.user._id
            });
            // this is my first updation
            // now saving comment id in post collection
            post.comments.push(comment.id);   // or post.comments.push(comment/comment._id) it will also works as mongoose will fetch only id
            // now telling mongodb to save it
            post.save();
            req.flash('success','Comment created!');
            return res.redirect('back');
        }
        
    }catch(err){
        req.flash('error',err);
        return;
    }
    
}

// // deleting the comment from database
// module.exports.destroy = function(req,res){
//     console.log("comment id : ",req.query.id);
//     Comment.findById(req.query.id,function(err,comment){
//         // handle error
//         if(err)
//         {
//             console.log("Error in finding comment from database",err);
//             return res.redirect('/');
//         }
//         // if the current signed in user is same as user who commented
//         // or the user who created the post because the post creator has right to delete the comment if
//         // he/she didn't like it
//         if(req.user.id==comment.user||req.user.id==comment.post)
//         {
//             let postId = comment.post;
//             comment.remove();
//             Post.findByIdAndUpdate(postId,{$pull : {comments : req.query.id}},function(err,post){
//                 return res.redirect('back');
//             });
//         }
//         else
//         {
//             return res.redirect('back');
//         }

//     });
// }

// deleting the comment from database using async await
module.exports.destroy = async  function(req,res){
    try{
        let comment = await Comment.findById(req.query.id)
        // if the current signed in user is same as user who commented
        // or the user who created the post because the post creator has right to delete the comment if
        // he/she didn't like it
        if(req.user.id==comment.user||req.user.id==comment.post)
        {
            let postId = comment.post;
            comment.remove();
            await Post.findByIdAndUpdate(postId,{$pull : {comments : req.query.id}});
            req.flash('success','Comment deleted!');
            return res.redirect('back');
        }
        else
        {
            req.flash('error','You cannot delete the comment!');
            return res.redirect('back');
        }   
    }catch(err){
        req.flash('error',err);
        return;
    }  
}