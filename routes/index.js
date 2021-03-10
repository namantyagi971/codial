// not create the new instance of express , passing the existing instance of express
const express = require('express');

// route handler
const router = express.Router();

// importing from controllers/home_controllers.js
const homeContollers = require('../controllers/home_controller');

router.get('/',homeContollers.home);
router.get('/courses',homeContollers.courses);

// route with '/users' will handle by users.js
router.use('/users',require('./users'));

// export it to main file index.js
module.exports = router;