const { addTweet } = require('../Controller/UserTweetController');
const { protect } = require('../MiddleWare/protectedMiddleware');

const router = require('express').Router();

router.post('/addTweet', protect, addTweet);

module.exports = router;
