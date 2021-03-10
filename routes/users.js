const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile',userController.profile);
router.get('/coder',userController.coder);

module.exports = router;