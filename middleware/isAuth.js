function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("You must sign in to view this page");
  }
}

module.exports = isAuth;
