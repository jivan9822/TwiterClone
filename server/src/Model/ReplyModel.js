const mongoose = require('mongoose');

const replySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    postId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: 'Post',
    },
    reply: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reply = mongoose.model('Reply', replySchema);
module.exports = Reply;
