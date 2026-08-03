function notFound(req, res, next) {

  // Create error for requests that do not match any route
  const error = new Error(
    `Route not found - ${req.originalUrl}`
  );

  res.status(404);

  next(error);
}

module.exports = notFound;