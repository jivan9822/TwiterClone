const User = require('../Model/UserModel');
const { promisify } = require('util');
const AppError = require('../Utils/AppError');
const { CatchAsync } = require('../Utils/CatchAsync');
const jwt = require('jsonwebtoken');

exports.authentication = CatchAsync(async (req, res, next) => {
  const { userName, password } = req.body.data;
  const user = await User.findOne({ userName }).select('+password');
  if (!user) {
    return next(new AppError('Invalid user name! Please try again!!!', 400));
  }
  if (!(await user.comparePass(password, user.password))) {
    return next(new AppError('Incorrect password! Please try again!', 400));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SEC_STRING);
  req.token = token;
  user.password = undefined;
  req.user = user;
  next();
});

exports.protect = CatchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  console.log(req.cookies);
  if (!token) {
    return next(new AppError('You are not logged in! Please login...', 403));
  }
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SEC_STRING);
  const user = await User.findById(decode.id);
  if (!user) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  req.user = user;
  next();
});
