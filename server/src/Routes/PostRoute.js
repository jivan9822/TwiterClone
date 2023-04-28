const {
  addPost,
  getAllPosts,
  deletePost,
  editPost,
} = require('../Controller/UserPostController');
const { protect } = require('../MiddleWare/protectedMiddleware');

const router = require('express').Router();

router.post('/addPost', protect, addPost);
router.post('/deletePost', protect, deletePost);
router.post('/editPost', protect, editPost);
router.get('/getAllPost', getAllPosts);

module.exports = router;
