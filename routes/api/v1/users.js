// not create the new instance of express , passing the existing instance of express
const express = require('express');

// route handler
const router = express.Router();

const usersApi = require('../../../controllers/api/v1/users_api');

router.post('/create-session',usersApi.createSession); 

module.exports = router;