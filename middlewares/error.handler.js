const { ValidationError } = require('sequelize');

function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function ormHandlerError(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      message: err.message,
      error: err.errors,
    });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormHandlerError };
