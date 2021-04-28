const Comment = require('../modals/comment');
const Post = require('../modals/post');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');
const commentsMailer = require('../mailers/comments_mailer');
// const User = require('../modals/user');

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
                post : req.body.post,
                user : req.user._id
            });
            // this is my first updation
            // now saving comment id in post collection
            post.comments.push(comment);   // or post.comments.push(comment/comment._id) it will also works as mongoose will fetch only id
            // now telling mongodb to save it
            post.save();
            comment = await comment.populate('user','name email').execPopulate();

            // calling newComment function in commentsMailer.js file
            // commentsMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log("error in sending to the queue",err);
                    return;
                }
                console.log("job enqueued",job.id);
            });
     
            if(req.xhr)
            {
                // console.log("inside ajax");
                return res.status(200).json({
                    data : {
                        comment : comment
                    },
                    message : "Comment created!"
                });
            }
            console.log("line 67");
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
        if(req.user.id==comment.user)
        {
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId,{$pull : {comments : req.query.id}});

            // send the comment id which was deleted back to views
            if(req.xhr){
                return res.status(200).json({
                    data : {
                        comment_id : req.query.id
                    },
                    message : "Comment deleted!"

                });
            }
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