const Post = require('../Model/PostModel');
const { CatchAsync } = require('../Utils/CatchAsync');

exports.addPost = CatchAsync(async (req, res, next) => {
  req.body.content = req.body.post;
  req.body.postedBy = req.user;
  const post = await Post.create(req.body);
  req.status(201).json({
    status: true,
    message: 'Post created success!',
    post,
  });
});
