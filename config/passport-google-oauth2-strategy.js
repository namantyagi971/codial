const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const env = require('./environment');

const crypto = require('crypto');
const User = require('../modals/user');

// tell passport to use new strategy for google login
 passport.use(new googleStrategy({
        clientID : env.google_client_id,
        clientSecret : env.google_client_secret,
        callbackURL : env.google_call_back_url
    },function(accessToken, refreshToken, profile, done){

        // find a user
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err)
            {
                console.log("error in google-strategy passport",err); 
                return;
            }

            console.log("***profile ",profile);

            // if user found set this user as a req.user
            if(user){
                return done(null,user);
            }

            // if not found, create a user and set this user as a req.user
            else{
                User.create({
                        name : profile.displayName,
                        email : profile.emails[0].value,
                        password : crypto.randomBytes(20).toString('hex')
                    },function(err,user){
                        if(err){
                            console.log("error in creating user",err); 
                            return;
                        }
                        else{
                            return done(null,user);
                        }
                })
            }
        });
    }));

module.exports = passport;