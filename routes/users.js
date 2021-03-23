const express = require('express');
const { route } = require('.');

const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile',userController.profile);
router.get('/coder',userController.coder);

router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);

// route for posting the form of new user
router.post('/create',userController.create);

module.exports = router;