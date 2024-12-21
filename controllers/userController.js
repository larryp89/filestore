// Handles user interactions
const { validationResult } = require("express-validator");
const passport = require("../config/passport");
const userService = require("../services/userService");

const getSignup = async (req, res) => {
  res.render("sign-up", { errors: [] });
};

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("sign-up", { errors: errors.array() });
  }
  console.log("Successfully signed up!");
  return res.render("login", { errors: [] });
};

const getLogin = async (req, res) => {
  res.render("login", { errors: [] });
};

const login = passport.authenticate("local", {
  failureRedirect: "/login",
  failureFlash: true,
  successRedirect: "/",
});

const logout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const getDocuments = async (req, res) => {
  const currentUser = req.user.id;
  const folders = await userService.getRootFolders(currentUser);
  const files = await userService.getRootFiles(currentUser);
  return res.render("documents", { folders, files });
};
module.exports = { getSignup, signup, getLogin, login, logout, getDocuments };
