const Post = require('../Model/PostModel');
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
  const postId = req.body.postId;
  const post = await Post.findByIdAndDelete(postId);
  if (post.retweetData) {
    await Post.findByIdAndUpdate(post.retweetData, {
      $pull: { reTweetUsers: post.postedBy },
    });
    const user = await User.findByIdAndUpdate(post.postedBy, {
      $pull: { reTweets: post.retweetData },
    });
    if (user) {
      setUserAuth(user._id, user);
    }
  } else {
    await Post.deleteMany({ retweetData: postId });
  }
  res.status(204).json({
    status: true,
  });
});
