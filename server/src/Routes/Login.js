const { userRegistration } = require('../Controller/UserRegistration');
const { requireLogin } = require('../MiddleWare/loginMiddleware');

const router = require('express').Router();

router.post('/registration', userRegistration);

router.get('/', (req, res, next) => {
  console.log(req.body);
  res.send('Hello');
});

module.exports = router;
