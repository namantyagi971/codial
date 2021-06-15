// importing the required library
const express = require('express');
const passport = require('passport');

const router = express.Router();

const userController = require('../controllers/users_controller');
const friendshipController = require('../controllers/friendship_controller');

// make the profile page accessible only when the user signed in (by check authentication)
router.get('/profile/',passport.checkAuthentication,userController.profile);
router.get('/profile/:id/toggle_friend',friendshipController.toggleFriends);
router.post('/update/',passport.checkAuthentication,userController.update);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);
router.get('/sign-out',userController.destroySession);
// route for posting the form of new user
router.post('/create',userController.create);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate('local',{ failureRedirect : '/users/sign-in'}),userController.createSession);

// creating two routes for social authentication through google
router.get('/auth/google',passport.authenticate('google',{scope : ['profile','email']}));
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect : '/users/sign-in'}),userController.createSession);

module.exports = router;
