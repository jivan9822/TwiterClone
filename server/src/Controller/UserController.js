const User = require('../Model/UserModel');
const { CatchAsync } = require('../Utils/CatchAsync');

exports.UserLogin = (req, res, next) => {
  res.cookie('jwt', req.token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  res.status(200).json({
    status: true,
    message: 'Login success!',
    data: {
      token: req.token,
      user: req.user,
    },
  });
};

exports.isValidUser = CatchAsync(async (req, res, next) => {
  res.status(200).json({
    status: true,
    message: 'User verification success!',
    data: {
      user: req.user,
    },
  });
});
exports.userRegistration = CatchAsync(async (req, res, next) => {
  // console.log(req.body);
  // console.log(req.file);
  const user = await User.create(req.body);
  res.send('User Registration!');
});
