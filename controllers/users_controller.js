// importing the collection
const User = require('../modals/user');

module.exports.profile = function(req,res){
    User.findById(req.query.id,function(err,user){
        return res.render('user_profile',{
        title: "User | Profile",
        user_profile : user
        });
    });
}

// updating the profile
module.exports.update= function(req,res){
    // someone can render the HTML to change the profile id so check here also
    if(req.user.id==req.query.id)
    {
        User.findByIdAndUpdate(req.query.id,req.body,function(err,user){
                return res.redirect('back');
        });
    }
    else
    {
        return res.status(401).send('Unauthorized');
    }
}
module.exports.signIn = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('users_sign_in',{
        title : "Codial | SignIn"
    });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
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
    User.findOne({email : req.body.email},function(err,user){
        if(err)
        {
            console.log("error in finding user from database");
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,newuser){
                if(err)
                {
                    console.log("error in creating new user in database");
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else
        {
            return res.redirect('back');
        }
        
    })

}

// sign in and  create the session for user 
module.exports.createSession = function(req,res){
    return res.redirect('/');
}

// destroying the session and log out
module.exports.destroySession = function(req,res){
    req.logout();
    return res.redirect('/');
}