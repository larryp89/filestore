function errorHandler(req, res, next) {
  if (req.query.error) {
    res.locals.error = req.query.error;
  }
  next();
}

module.exports = errorHandler;
