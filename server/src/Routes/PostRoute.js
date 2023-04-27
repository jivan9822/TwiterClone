const {
  addPost,
  getAllPosts,
  deletePost,
} = require('../Controller/UserPostController');
const { protect } = require('../MiddleWare/protectedMiddleware');

const router = require('express').Router();

router.post('/addPost', protect, addPost);
router.post('/deletePost', protect, deletePost);
router.get('/getAllPost', getAllPosts);

module.exports = router;
