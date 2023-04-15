const { addPost } = require('../Controller/UserPostController');
const { protect } = require('../MiddleWare/protectedMiddleware');

const router = require('express').Router();

router.post('/addPost', protect, addPost);

module.exports = router;
