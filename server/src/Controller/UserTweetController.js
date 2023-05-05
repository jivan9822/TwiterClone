const mongoose = require('mongoose');
const Post = require('../Model/PostModel');
const User = require('../Model/UserModel');
const { CatchAsync } = require('../Utils/CatchAsync');
const { setUserAuth } = require('../Utils/RedisHandler');

exports.addTweet = CatchAsync(async (req, res, next) => {
  // const { userId, postId } = req.body;
  const userId = new mongoose.Types.ObjectId(req.body.userId);
  const postId = new mongoose.Types.ObjectId(req.body.postId);
  const retweet = await Post.findOneAndDelete({
    postedBy: userId,
    retweetData: postId,
  });
  const action = retweet ? '$pull' : '$addToSet';
  let reTweetPost = retweet;
  if (!reTweetPost) {
    reTweetPost = await Post.create({
      postedBy: userId,
      retweetData: postId,
    });

    const newReTweetPost = await Post.populate(reTweetPost, [
      'postedBy',
      'retweetData',
      'retweetData.postedBy',
    ]);
    reTweetPost = await Post.populate(newReTweetPost, {
      path: 'retweetData.postedBy',
    });
  }
  let post = await Post.findByIdAndUpdate(
    postId,
    {
      [action]: { reTweetUsers: userId },
    },
    { new: true }
  );

  let user = await User.findByIdAndUpdate(
    userId,
    {
      [action]: { reTweets: reTweetPost.retweetData },
    },
    { new: true }
  );
  if (user) {
    setUserAuth(user._id, user);
  }
  if (action === '$pull') {
    res.status(204).json({
      status: true,
    });
  } else {
    res.status(201).json({
      status: true,
      message: 'Tweet Added success',
      reTweetPost,
    });
  }
});
