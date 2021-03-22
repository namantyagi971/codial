// 
module.exports.profile = function(req,res){
    return res.render('users',{
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
    // To Do later
}

// sign in and  create the session for user 
module.exports.createSession = function(req,res){
    // To Do later
}