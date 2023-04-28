const Post = require('../Model/PostModel');
const Reply = require('../Model/ReplyModel');
const User = require('../Model/UserModel');
const { CatchAsync } = require('../Utils/CatchAsync');
const { setUserAuth } = require('../Utils/RedisHandler');

exports.userLike = CatchAsync(async (req, res, next) => {
  const { postId, userId } = req.body;
  let isLike = req.user.likes && req.user.likes.includes(postId);
  const action = isLike ? '$pull' : '$addToSet';
  const user = await User.findByIdAndUpdate(
    userId,
    {
      [action]: { likes: postId },
    },
    { new: true }
  );
  setUserAuth(user._id, user);
  const post = await Post.findByIdAndUpdate(
    postId,
    {
      [action]: { likes: userId },
    },
    { new: true }
  );
  res.status(200).json({
    status: true,
    message: 'Post and user update success!',
    post,
  });
});

exports.userRetweet = CatchAsync(async (req, res, next) => {
  const { postId, userId } = req.body;
  res.send('retweet');
});

exports.userReply = CatchAsync(async (req, res, next) => {
  const { postId, userId, reply } = req.body;
  const postReply = await Reply.create(req.body);
  const populatedReply = await Reply.populate(postReply, {
    path: 'userId',
  });
  res.status(201).json({
    status: true,
    message: 'Reply added success!',
    reply: populatedReply,
  });
});
