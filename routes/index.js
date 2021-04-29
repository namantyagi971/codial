// not create the new instance of express , passing the existing instance of express
const express = require('express');

// route handler
const router = express.Router();

// importing from controllers/home_controllers.js
const homeContollers = require('../controllers/home_controller');

router.get('/',homeContollers.home);

// route with '/users' will handle by users.js
router.use('/users',require('./users'));

// route with '/api' will be handle by api folder
router.use('/api',require('./api'));

router.use('/comments',require('./comments'));

router.use('/posts',require('./posts'));
router.use('/likes',require('./likes'));

// export it to main file index.js
module.exports = router;