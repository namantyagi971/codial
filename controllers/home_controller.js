// require the schema
const Post = require('../modals/post');

// export to other files
module.exports.home = function(req,res){
    // printing the cookie coming from browser side
    console.log(req.cookies);
    // changing the cookie at server side
    res.cookie('user_id',25);
    // reading the post from database and display
    // Post.find({},function(err,posts){
    //     if(err)
    //     {
    //         console.log("error in finding post from database");
    //         return;
    //     }
    //     return res.render('home',{
    //         allposts : posts,
    //         title : 'Codial | home'
    //     });
    // });

    // populate the user of each post
    Post.find({}).populate('user')
    //  this is nested population
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            allposts : posts,
            title : 'Codial | home'
        });

    });
}
