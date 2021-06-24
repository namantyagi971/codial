// require the schema
const Post = require('../modals/post');
const User = require('../modals/user');
const Friendship = require('../modals/friendship');

// export to other files
// module.exports.home = function(req,res){
//     // printing the cookie coming from browser side
//     console.log(req.cookies);
//     // changing the cookie at server side
//     res.cookie('user_id',25);
//     // reading the post from database and display
//     // Post.find({},function(err,posts){
//     //     if(err)
//     //     {
//     //         console.log("error in finding post from database");
//     //         return;
//     //     }
//     //     return res.render('home',{
//     //         allposts : posts,
//     //         title : 'Codial | home'
//     //     });
//     // });

//     // populate the user of each post
//     Post.find({}).populate('user')
//     //  this is nested population
//     .populate({
//         path : 'comments',
//         populate : {
//             path : 'user'
//         }
//     })
//     .exec(function(err,posts){

//         User.find({},function(err,users){
//             return res.render('home',{
//             allposts : posts,
//             title : 'Codial | home',
//             all_users : users
//         });

//     });
// });
// }

// doing it async await way
module.exports.home = async function(req,res){

    try{
       let posts = await Post.find({})
       // this is used to sort the post according to nearest time first
       .sort('-createdAt')
       .populate('user')
            //  this is nested population
            .populate({
                path : 'comments',
                populate : {
                    path : 'user'
                },
                // i need to popuate likes of comments associated with post
                populate : {
                    path : 'likes'
                }
            }).populate('likes');

        let users = await User.find({});

        // finding the friends of logged in user
        let friends = new Array();

        // friends list will be displayed only if the user is signed in
        if(req.user)
        {
            // checking the friendship model to find all the friends of current logged in user
            // friends can be found on the basis of either the current logged in user accepted or send the request
            //  we are also populating to see the user id
            let all_friendships = await Friendship.find({$or : [{from_user:req.user._id},{to_user : req.user._id}]})
                                  .populate('from_user')
                                  .populate('to_user');
            
            // now storing all the friends in the array so that they can be load at the front end quickly
            for(let friend of all_friendships)
            {
                if(friend.from_user._id.toString() == req.user._id.toString())
                {
                    friends.push({
                        friend_name : friend.to_user.name,
                        friend_id : friend.to_user._id,
                        friend_avatar : friend.to_user.avatar
                    });
                    // console.log("*********Friend_name : ",friend.to_user.name);
                }
                else if(friend.to_user._id.toString() == req.user._id.toString())
                {
                    friends.push({
                        friend_name : friend.from_user.name,
                        friend_id : friend.from_user._id,
                        friend_avatar : friend.from_user.avatar
                    });
                    // console.log("*********Friend_name : ",friend.from_user.name);
                }

            }
        }
        var options = {
                title : "Codial | home",
                allposts : posts,
                all_users : users,
                friends : friends
        };
        return res.render('home',options);

    }catch(err){
     console.log(`Error ${err}`);
     return;
    }
}
