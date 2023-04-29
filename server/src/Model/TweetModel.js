const mongoose = require('mongoose');

const TweetSchema = mongoose.Schema(
  {
    tweetId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Post',
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Tweet = mongoose.model('Tweet', TweetSchema);
module.exports = Tweet;
