const { UserLogin, isValidUser } = require('../Controller/UserController');
const { userRegistration } = require('../Controller/UserController');
const {
  uploadUserPhoto,
  resizeUserPhoto,
} = require('../MiddleWare/fileUploads');
const {
  authentication,
  protect,
} = require('../MiddleWare/protectedMiddleware');

const router = require('express').Router();

router.post(
  '/registration',
  uploadUserPhoto,
  resizeUserPhoto,
  userRegistration
);

router.get('/isLogin', protect, isValidUser);

router.post('/login', authentication, UserLogin);

module.exports = router;
