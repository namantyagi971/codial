// importing the collection
const User = require('../modals/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id)
    {
         User.findById(req.cookies.user_id,function(err,user){
            if(err)
            {
                console.log("error in finding user from database");
                return;
            }
            if(user)
            {
                return res.render('users_profile',{
                    title : "User Profile",
                    user : user
                });
            }
            return res.redirect('/users/sign-in');
        });
    }
    // if someone delete the cookie having user id
    else
    {
        return res.redirect('/users/sign-in');
    }
}



module.exports.signIn = function(req,res){
    return res.render('users_sign_in',{
        title : "Codial | SignIn"
    });
}

module.exports.signUp = function(req,res){
    return res.render('users_sign_up',{
        title : "Codial | SignUp"
    });
}

// get the sign up data
module.exports.create = function(req,res){
    
    //if password and confirm password don't match
    if(req.body.password!=req.body.confirm_password)
    {
        return res.redirect('back');
    }

    // verifying the email (because email should be unique)
    User.findOne({email : req.body.email},function(err,user){
        if(err)
        {
            console.log("error in finding user from database");
            return;
        }

        // user is signing up for first time
        if(!user)
        {
            User.create(req.body,function(err,newuser){
                if(err)
                {
                    console.log("error in creating new user in database");
                    return;
                }
                return res.redirect('users/sign-in');
            });
        }

        // user already exists
        else
        {
            return res.redirect('back');
        }
        
    })

}

// sign in and  create the session for user 
module.exports.createSession = function(req,res){
    // verifying idenitity (through) email
    User.findOne({email : req.body.email},function(err,user){
        if(err)
        {
            console.log("error in finding user from database");
            return;
        }

        // if user found
        if(user)
        {
            // verifying password

            // if password matches
            if(user.password==req.body.password)
            {
                // create session for user 
                res.cookie('user_id',user.id);
                return res.redirect('/users/profile');
            }

            // if password doesn't match
            else
            {
                return res.redirect('back');
            }
                     
        }
         // if user not found
        else
        {
            return res.redirect('back');
        }

    });
}