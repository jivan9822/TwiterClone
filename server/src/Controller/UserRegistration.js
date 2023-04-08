const User = require('../Model/UserModel');
const { CatchAsync } = require('../Utils/CatchAsync');

exports.userRegistration = CatchAsync(async (req, res, next) => {
  const user = await User.create(req.body);
  res.send('User Registration!');
});
