const { UserLogin } = require('../Controller/UserLogin');
const { userRegistration } = require('../Controller/UserRegistration');
const { authentication } = require('../MiddleWare/protectedMiddleware');

const router = require('express').Router();

router.post('/registration', userRegistration);

router.post('/login', authentication, UserLogin);

module.exports = router;
