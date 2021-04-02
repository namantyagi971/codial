const express = require('express');
const passport = require('passport');
const router = express.Router();

const postController = require('../controllers/post_controller');

// passport.checkauthentication is used so that anonymous user can't post after creating dummy form in HTML
router.post('/create',passport.checkAuthentication,postController.create);
router.get('/delete/',passport.checkAuthentication,postController.destroy);

module.exports = router;