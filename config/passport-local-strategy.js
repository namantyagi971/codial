// require the library
const passport = require('passport');

// require the strategy property
const LocalStrategy = require('passport-local').Strategy;

// import the UserSchema
const User = require('../modals/user');

// require user

// authentication using passport.js
passport.use(new LocalStrategy({
    usernameField : 'email',
    passReqToCallback : true
    },

    // function to take email and password entered by user and done is callback function that report to passport
    function(req,email,password,done){
          
        // finding user and verifying its identity
        User.findOne({email: email},function(err,user){
            if(err)
            {
                req.flash('error',"Error in finding user --> passport");
                return done(err);
            }
            // user not found or entered password doesn't match
            if(!user||user.password!=password)
            {
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }
            // successfully found user
            return done(null,user);
        });

    }
));

// serialize user function to decide which key is kept in cookie in encryted form
passport.serializeUser(function(user,done){
    return done(null,user.id);
});

// deserialize user function to get the user back from key whenever user make new request
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log("Error in finding user --> passport");
            return done(err);
        }
        return done(null,user);
    });
});

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // if the user is authenticated,then pass to the next function(i.e, controller's action)
    if(req.isAuthenticated())
    {
        next();
        return;
    }
    // if the user is not authenticated
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req,res,next){
    if(req.isAuthenticated())
    {
        // req.user contains current signed in user from the session cookie and we are sending this to 
        // the locals for the views
        res.locals.user = req.user;
    }
    next();
}
// export passport to use by other files
module.exports = passport;