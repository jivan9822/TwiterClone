const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    postedBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    pinned: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
