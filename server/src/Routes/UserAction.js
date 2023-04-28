const router = require('express').Router();
const { protect } = require('../MiddleWare/protectedMiddleware');
const action = require('../Controller/UserActionController');

router.post('/reply', protect, action.userReply);
router.post('/deleteReply', protect, action.deleteReply);
router.post('/retweet', protect, action.userRetweet);
router.post('/like', protect, action.userLike);

module.exports = router;
