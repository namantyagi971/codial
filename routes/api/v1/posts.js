// not create the new instance of express , passing the existing instance of express
const express = require('express');
// const { post } = require('.');

// route handler
const router = express.Router();

const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/',postsApi.index);
router.delete('/:id',postsApi.destroy);   // is this correct?
//if u have used req.query then its correct but it is not showing deleted post at postman once check posts_api controller


//its little differmt from sir k acoede i have used req.query.id at controllers sir has used req.params ohkay let me check

module.exports = router;