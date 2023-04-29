const Post = require('../Model/PostModel');
const Tweet = require('../Model/TweetModel');
const User = require('../Model/UserModel');
const { CatchAsync } = require('../Utils/CatchAsync');

exports.addTweet = CatchAsync(async (req, res, next) => {
  const { userId, tweetId } = req.body;
  const data = await Tweet.findOneAndDelete({ userId, tweetId });
  let action = data ? '$pull' : '$addToSet';
  let tweet = data ? data : await Tweet.create(req.body);
  let post = await Post.findByIdAndUpdate(
    tweetId,
    {
      [action]: { tweets: tweet._id },
    },
    { new: true }
  );
  let user = await User.findByIdAndUpdate(
    userId,
    {
      [action]: { tweets: tweet._id },
    },
    { new: true }
  );
  if (!data) {
    let post = await Post.create({ content: post.content, postedBy: userId });
  }
  console.log(post);
  res.status(201).json({
    status: true,
    message: 'Tweet Added success',
    tweet,
  });
});
