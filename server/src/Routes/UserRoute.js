const { UserLogin, isValidUser } = require('../Controller/UserLogin');
const { userRegistration } = require('../Controller/UserRegistration');
const {
  authentication,
  protect,
} = require('../MiddleWare/protectedMiddleware');

const router = require('express').Router();

router.post('/registration', userRegistration);

router.get('/isLogin', protect, isValidUser);

router.post('/login', authentication, UserLogin);

module.exports = router;
