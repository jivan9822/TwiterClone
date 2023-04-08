const AppError = require('./AppError');

const duplicateErrHandler = (err) => {
  const msg = err.message.match(/{.*?}/);
  return new AppError(`Duplicate not allowed! ${msg[0]}`, 409);
};

exports.globalErrorHandler = (err, req, res, next) => {
  if (err.code === 11000) err = duplicateErrHandler(err);
  res.status(err.statusCode || 500).json({
    status: false,
    message: err.message,
    err,
  });
};
