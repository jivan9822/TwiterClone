const { fireBaseUpload } = require('../MiddleWare/FileUploadFirebase');
const {
  UserLogin,
  isValidUser,
  getAllUsers,
  UserLogOut,
} = require('../Controller/UserController');
const { userRegistration } = require('../Controller/UserController');
const { uploadUserPhoto } = require('../MiddleWare/fileUploads');
const {
  authentication,
  protect,
} = require('../MiddleWare/protectedMiddleware');

const router = require('express').Router();

router.post('/registration', uploadUserPhoto, fireBaseUpload, userRegistration);

router.get('/isLogin', protect, isValidUser);
router.get('/allusers', getAllUsers);

router.post('/login', authentication, UserLogin);
router.get('/logout', protect, UserLogOut);

module.exports = router;
