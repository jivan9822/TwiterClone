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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

PostSchema.virtual('replies', {
  ref: 'Reply',
  foreignField: 'postId',
  localField: '_id',
  options: {
    populate: ['userId postId'],
  },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
