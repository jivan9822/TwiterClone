const { default: mongoose } = require('mongoose');
const Post = require('../Model/PostModel');
const Reply = require('../Model/ReplyModel');
const User = require('../Model/UserModel');
const { CatchAsync } = require('../Utils/CatchAsync');
const { setUserAuth } = require('../Utils/RedisHandler');

exports.addPost = CatchAsync(async (req, res, next) => {
  req.body.content = req.body.post;
  req.body.postedBy = req.user;
  let post = await Post.create(req.body);
  const populatedPost = await Post.populate(post, { path: 'postedBy' });

  res.status(201).json({
    status: true,
    message: 'Post created success!',
    post: populatedPost,
  });
});

exports.getAllPosts = CatchAsync(async (req, res, next) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate(['postedBy', 'retweetData'])
    .populate({
      path: 'replies',
      options: { sort: { createdAt: -1 } }, // Sort the replies array on createdAt
    });

  const newPost = await Post.populate(posts, { path: 'retweetData.postedBy' });

  res.status(200).json({
    status: true,
    message: `${posts.length} posts found!`,
    posts: newPost,
  });
});

exports.editPost = CatchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.body.postId, {
    $set: { content: req.body.newPost },
  }).populate('postedBy');
  res.status(200).json({
    status: true,
    message: 'Update done!',
    post,
  });
});

exports.deletePost = CatchAsync(async (req, res, next) => {
  const postId = new mongoose.Types.ObjectId(req.body.postId); // id of post want to delete
  const post = await Post.findByIdAndDelete(postId); // deleting post
  // is the post is retweeted
  if (post.retweetData) {
    // Removing retweets of deleted post from all users who tweeted this post
    await User.updateMany(
      { reTweets: post.retweetData },
      { $pull: { reTweets: post.retweetData } },
      { new: true }
    );
    // Removing user from main post who is belongs to the deleted teTweet post
    await Post.findByIdAndUpdate(
      post.retweetData,
      {
        $pull: { reTweetUsers: post.postedBy },
      },
      { new: true }
    );
  } else {
    // If main post is deleting
    await Post.deleteMany({ retweetData: postId }); // deleting all reTweet of the main post

    // Removing reTweets of main post from all users who reTweeted to deleted main post
    await User.updateMany(
      { reTweets: post._id },
      { $pull: { reTweets: post._id } },
      { new: true }
    );
  }
  // This code will for both either main post or reTweet post.
  await User.updateMany(
    // Remove likes for post from user likes array
    { likes: postId },
    { $pull: { likes: postId } },
    { new: true }
  );
  // Here deleting all reply for the post
  await Reply.deleteMany({ postId });

  // Getting updated login user and setting in catch
  const user = await User.findById(req.user._id);
  setUserAuth(user._id, user);

  res.status(204).json({
    status: true,
  });
});
