require('dotenv').config({ path: 'config.env' });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('./src/Utils/MongooseConnection');
const userRoute = require('./src/Routes/UserRoute');
const userPostRoute = require('./src/Routes/PostRoute');
const userActionRoute = require('./src/Routes/UserAction');
const userTweetRoute = require('./src/Routes/UserTweetRoute');
const AppError = require('./src/Utils/AppError');
const { globalErrorHandler } = require('./src/Utils/globalErrorHandler');

const app = express();
app.use(express.static('src/images/'));
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://tangerine-gumption-7869cd.netlify.app',
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use('/user', userRoute);
app.use('/userPost', userPostRoute);
app.use('/userAction', userActionRoute);
app.use('/userTweet', userTweetRoute);

app.all('*', (req, res, next) => {
  return next(new AppError(`The ${req.originalUrl} not found in server!`, 400));
});

app.use(globalErrorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
