const { addPost, getAllPosts } = require('../Controller/UserPostController');
const { protect } = require('../MiddleWare/protectedMiddleware');

const router = require('express').Router();

router.post('/addPost', protect, addPost);
router.get('/getAllPost', getAllPosts);

module.exports = router;
