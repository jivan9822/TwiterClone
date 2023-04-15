const { UserLogin, isValidUser } = require('../Controller/UserController');
const { userRegistration } = require('../Controller/UserController');
const {
  authentication,
  protect,
} = require('../MiddleWare/protectedMiddleware');

const router = require('express').Router();

router.post('/registration', userRegistration);

router.get('/isLogin', protect, isValidUser);

router.post('/login', authentication, UserLogin);

module.exports = router;
