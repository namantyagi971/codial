// importing the collection
const User = require('../modals/user');

module.exports.profile = function(req,res){
    return res.render('user_profile',{
        title: "Coding Ninjas Courses",
    });
}

module.exports.coder = function(req,res){
    return res.end('<h1> Naman Tyagi is hiring top Coder. Wanna join him ?  </h1>');
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
                return res.redirect('users/sign-in');
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
    // To Do later
}