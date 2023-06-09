require('dotenv').config({ path: 'config.env' });
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('./src/Utils/MongooseConnection');
const userRoute = require('./src/Routes/UserRoute');
const AppError = require('./src/Utils/AppError');
const { globalErrorHandler } = require('./src/Utils/globalErrorHandler');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());
app.use('/user', userRoute);

app.all('*', (req, res, next) => {
  return next(new AppError(`The ${req.originalUrl} not found in server!`, 400));
});

app.use(globalErrorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
