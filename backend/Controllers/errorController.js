const AppError = require('../utils/appError');

// 1) For invalid path
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path} : ${err.value}.`;
  return new AppError(message, 400);
};

// 2) For Invalid Data/Validation
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `${errors.join('. ')}`;
  return new AppError(message, 400);
};

// 3) For Duplicate Fields Handling
const handleDuplicateFieldsDB = (err) => {
  const message = `The ${Object.values(
    err.keyValue
  )} is already used as ${Object.keys(err.keyValue)}`;
  return new AppError(message, 400);
};

// 4) For JSONWEBTOKEN Errors
// eslint-disable-next-line
const handleJWtError = () => {
  return new AppError(`Invalid Token, Please login again`, 401);
};
// 5) For JSONWEBTOKEN Expired Errors
// eslint-disable-next-line
const handleJWTExpiredError = () => {
  return new AppError(`Your Token Has expired please log in again`, 401);
};
// 1) Development Error
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// 2) Production Error
const sendErrProd = (err, res) => {
  // operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // programming or other unknown error: Don't leak more information
  } else {
    // 1)Log the error
    // eslint-disable-next-line no-console
    console.log('Error', err);

    // 2)Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something Went Wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    // 1) For Invalid ID's
    if (err.name === 'CastError') {
      let error = { ...err };
      error = handleCastErrorDB(error);
      return sendErrProd(error, res);
    }

    // 2) For Mongoose Validation error
    if (err.name === 'ValidationError') {
      let error = { ...err };
      error = handleValidationErrorDB(error);
      return sendErrProd(error, res);
    }

    // 3) Duplicate Field Error
    if (err.code === 11000) {
      let error = { ...err };
      error = handleDuplicateFieldsDB(error);
      return sendErrProd(error, res);
    }
    // 4) JSON Web Token Error
    if (err.name === 'JsonWebTokenError') {
      let error = { ...err };
      error = handleJWtError();
      return sendErrProd(error, res);
    }
    // 5) JSON Web Token Expired Error
    if (err.name === 'TokenExpiredError') {
      let error = { ...err };
      error = handleJWTExpiredError();
      return sendErrProd(error, res);
    }

    sendErrProd(err, res);
  }
};
