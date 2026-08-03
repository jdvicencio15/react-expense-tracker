function errorHandler(err, req, res, next) {

  // Use existing status code or default to server error
  const statusCode = res.statusCode === 200
    ? 500
    : res.statusCode;


  res.status(statusCode).json({
    success: false,
    message: err.message,

    // Hide stack trace in production environment
    stack: process.env.NODE_ENV === "production"
      ? null
      : err.stack,
  });
}

module.exports = errorHandler;