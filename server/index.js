require('dotenv').config({ path: 'config.env' });
const express = require('express');
const cors = require('cors');
const mongoose = require('./src/Utils/MongooseConnection');
const login = require('./src/Routes/Login');
const { requireLogin } = require('./src/MiddleWare/loginMiddleware');
const AppError = require('./src/Utils/AppError');
const { globalErrorHandler } = require('./src/Utils/globalErrorHandler');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', requireLogin, (req, res, next) => {
  console.log(req.query.data);
  res.send('HomePage');
});
app.use('/login', login);

app.all('*', (req, res, next) => {
  return next(new AppError(`The ${req.originalUrl} not found in server!`, 400));
});

app.use(globalErrorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
