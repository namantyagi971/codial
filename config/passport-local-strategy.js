// require the library
const passport = require('passport');

// require the strategy property
const LocalStrategy = require('passport-local').Strategy;

// import the UserSchema
const User = require('../modals/user');

// require user

// authentication using passport.js
passport.use(LocalStrategy({
    usernameField : email
    },

    // function to take email and password entered by user and done is callback function that report to passport
    function(email,password,done){
          
        // finding user and verifying its identity
        User.findOne({email: email},function(err,user){
            if(err)
            {
                console.log("Error in finding user --> passport");
                return done(err);
            }
            // user not found or entered password doesn't match
            if(!user||user.password!=password)
            {
                console.log('Invalid Username/Password');
                return done(null,false);
            }
            // successfully found user
            return done(null,true);
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

// export passport to use by other files
module.exports = passport;