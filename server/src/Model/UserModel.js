const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
  fname: {
    type: String,
    required: [true, 'Please provide First Name of User'],
    trim: true,
  },
  lname: {
    type: String,
    required: [true, 'Please provide Last Name of User'],
    trim: true,
  },
  userName: {
    type: String,
    required: [true, 'Please provide Last Name of User'],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide Email of User'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
  },
  profilePic: {
    type: String,
    default: 'http://localhost:3002/default.jpg',
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
  tweets: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Tweet',
    },
  ],
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePass = async function (userPass, dbPass) {
  return await bcrypt.compare(userPass, dbPass);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
