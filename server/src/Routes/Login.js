const { requireLogin } = require('../MiddleWare/loginMiddleware');

const router = require('express').Router();

router.get('/', (req, res, next) => {
  console.log(req.body);
  res.send('Hello');
});

module.exports = router;
