// importing the collection
const User = require('../modals/user');
const Friendship = require('../modals/friendship');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function(req,res){
    // User.findById(req.query.id,function(err,user){
    //     return res.render('user_profile',{
    //     title: "User | Profile",
    //     user_profile : user
    //     });
    // });
    User.findById(req.params.id,async function(err,user){
        if(err)
        {
            connsole.log("error in finding user profile");
            return;
        }
        let are_friends = false;
        let friendship = await Friendship.findOne({$or : [{from_user:req.user._id,to_user:req.params.id},{from_user:req.params.id,to_user:req.user._id}]});
    
            if(friendship)
            {
                are_friends = true;
                // console.log("***** are friends inside : ",are_friends);
            }
            
        var options = {
            title : "User | Profile",
            are_friends : are_friends,
            user_profile : user,
            user_name : "Naman Tyagi"
        };
        // console.log("***** are friends outside : ",are_friends);
        return res.render('user_profile',options);
    });
}

// updating the profile
module.exports.update= async function(req,res){

    // someone can render the HTML to change the profile id so check here also
    // if(req.user.id==req.query.id)
    // {
    //     User.findByIdAndUpdate(req.query.id,req.body,function(err,user){
    //                     return res.redirect('back');
    //             });
    // }
    // else
    // {
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id==req.params.id)
    {
        try{
                let user = await User.findById(req.params.id);
                User.uploadedAvatar(req,res,function(err)
                {
                    if(err)
                    {
                        console.log("*******Multer Error",err);
                        return;
                    }
                    user.name = req.body.name;
                    user.email = req.body.email;
                    if(req.file)
                    {
                        if(user.avatar)
                        {
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                        }
                        //this is just saving the path of uploaded file in avatar field of user schema
                        user.avatar = User.avatarPath+'/'+req.file.filename;
                        // user.avatar = req.file.path;
                    }
                    user.save();
                    return res.redirect('back');
                });
            }catch(err){
                req.flash('error',err)
                console.log("error",err);
                return res.redirect('back');
            }     
    }
    else
    {
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized');
    }
}

// render the signIn page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('users_sign_in',{
        title : "Codial | SignIn"
    });
}

// render the signUp page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('users_sign_up',{
        title : "Codial | SignUp"
    });
}

// // get the sign up data
// module.exports.create = function(req,res){
    
//     //if password and confirm password don't match
//     if(req.body.password!=req.body.confirm_password)
//     {
//         return res.redirect('back');
//     }
//     User.findOne({email : req.body.email},function(err,user){
//         if(err)
//         {
//             console.log("error in finding user from database");
//             return;
//         }
//         if(!user)
//         {
//             User.create(req.body,function(err,newuser){
//                 if(err)
//                 {
//                     console.log("error in creating new user in database");
//                     return;
//                 }
//                 return res.redirect('/users/sign-in');
//             });
//         }
//         else
//         {
//             return res.redirect('back');
//         }
        
//     })

// }

// get the sign up data using async await
module.exports.create = async function(req,res){
    try{
        //if password and confirm password don't match
        if(req.body.password!=req.body.confirm_password)
        {
            return res.redirect('back');
        }
        let user = await User.findOne({email : req.body.email});
        if(!user)
        {
            await User.create(req.body);
            return res.redirect('/users/sign-in');
        }
        else
        {
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }

    }catch(err){
        console.log("error");
        return;
    } 
}

// sign in and  create the session for user 
module.exports.createSession = function(req,res){
    // req is an object and setting up an flash object in it
    req.flash('success' ,'Successfully Signed In!!');
    return res.redirect('/');
}

// destroying the session and log out
module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success' , 'Successfully Logged Out!!');
    return res.redirect('/');
}