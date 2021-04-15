// not create the new instance of express , passing the existing instance of express
const express = require('express');

// route handler
const router = express.Router();

const postsApi = require('../../../controllers/api/v2/posts_api');

router.get('/',postsApi.index);




module.exports = router;