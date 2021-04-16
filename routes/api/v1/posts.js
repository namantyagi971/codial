// not create the new instance of express , passing the existing instance of express
const express = require('express');
const passport = require('passport');
const { pass } = require('../../../config/mongoose');

// route handler
const router = express.Router();

const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/',postsApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy); 

module.exports = router;