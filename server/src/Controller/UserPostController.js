const Post = require('../Model/PostModel');
const { CatchAsync } = require('../Utils/CatchAsync');

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
  const posts = await Post.find().sort({ createdAt: -1 }).populate('postedBy');
  res.status(200).json({
    status: true,
    message: `${posts.length} posts found!`,
    posts,
  });
});
