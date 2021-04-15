// not create the new instance of express , passing the existing instance of express
const express = require('express');

// route handler
const router = express.Router();

router.use('/posts',require('./posts'));


module.exports = router;